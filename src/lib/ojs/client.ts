import "server-only";
import { OJS_API_BASE, OJS_API_TOKEN, REVALIDATE_SECONDS } from "../config";

/**
 * Server-only fetch helper for the OJS REST API. Authenticates with the API token
 * as an `apiToken` query parameter — this OJS deployment does not honor the
 * `Authorization: Bearer` header (Apache strips it), so the query param is the
 * reliable method. Uses Next's ISR cache.
 *
 * Never import this from a client component — it would leak the token.
 */
export async function ojsFetch<T>(
  path: string,
  init?: { searchParams?: Record<string, string | number | undefined>; revalidate?: number },
): Promise<T> {
  const url = new URL(`${OJS_API_BASE}/${path.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(init?.searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  if (OJS_API_TOKEN) url.searchParams.set("apiToken", OJS_API_TOKEN);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: init?.revalidate ?? REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OJS API ${res.status} for ${path}: ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}
