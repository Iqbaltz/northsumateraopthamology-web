import { OJS_PUBLIC_URL, REVALIDATE_SECONDS } from "@/lib/config";

/** The public OJS paths that serve a published galley's file, by kind of galley. */
const OJS_DOWNLOAD_PATHS = {
  article: "article/download",
  issue: "issue/download",
} as const;

/** An OJS id or url path: letters and digits, joined by single dots, dashes or underscores. */
const SEGMENT = /^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/;

/** Types the browser can show in its own viewer. Anything else is always saved. */
const PREVIEWABLE = /^(?:application\/pdf|image\/(?:png|jpeg|gif|webp))\b/i;

type RouteParams = { params: Promise<{ kind: string; id: string; galleyId: string }> };

function unavailable() {
  return new Response("This file is not available.", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Streams a published galley (an article or a full-issue PDF) from OJS, so it is
 * previewed or downloaded on this site rather than on the journal subdomain.
 * Opens inline by default; `?download` saves it instead.
 */
export async function GET(request: Request, { params }: RouteParams) {
  const { kind, id, galleyId } = await params;
  if (!Object.hasOwn(OJS_DOWNLOAD_PATHS, kind) || !SEGMENT.test(id) || !SEGMENT.test(galleyId)) {
    return unavailable();
  }
  const path = OJS_DOWNLOAD_PATHS[kind as keyof typeof OJS_DOWNLOAD_PATHS];

  // Pass the reader's agent and address along so OJS's download statistics
  // count the reader rather than this server.
  const headers = new Headers();
  for (const name of ["user-agent", "x-forwarded-for"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const upstream = await fetch(`${OJS_PUBLIC_URL}/${path}/${id}/${galleyId}`, {
    headers,
    cache: "no-store",
    // OJS answers a missing galley with a redirect to its issue page; treat that
    // as unavailable rather than sending the reader to the subdomain.
    redirect: "manual",
  }).catch(() => undefined);

  if (upstream?.status !== 200 || !upstream.body) return unavailable();

  const type = upstream.headers.get("content-type") ?? "application/octet-stream";
  const inline = PREVIEWABLE.test(type) && !new URL(request.url).searchParams.has("download");
  // Keep OJS's filename, swapping only the disposition type.
  const filename = upstream.headers
    .get("content-disposition")
    ?.replace(/^\s*(?:inline|attachment)\s*;?\s*/i, "");

  const response = new Headers({
    "Content-Type": type,
    "Content-Disposition": [inline ? "inline" : "attachment", filename].filter(Boolean).join("; "),
    "Cache-Control": `private, max-age=${REVALIDATE_SECONDS}`,
    "X-Content-Type-Options": "nosniff",
  });
  // fetch decodes compressed bodies, so a compressed length would no longer match.
  const length = upstream.headers.get("content-length");
  if (length && !upstream.headers.has("content-encoding")) response.set("Content-Length", length);

  return new Response(upstream.body, { headers: response });
}
