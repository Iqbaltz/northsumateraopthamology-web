import type { Galley } from "@/lib/ojs/types";
import { ojsLinks } from "@/lib/links";

/**
 * Full-text galleys (PDF / HTML) deep-link into OJS, which renders the PDF.js
 * viewer / HTML galley and serves the files.
 */
export function GalleyLinks({
  submissionId,
  galleys,
  size = "sm",
}: {
  submissionId: number;
  galleys: Galley[];
  size?: "sm" | "md";
}) {
  if (!galleys?.length) return null;

  const pad = size === "md" ? "px-5 py-2.5 text-sm" : "px-4 py-1.5 text-xs";

  return (
    <div className="flex flex-wrap gap-2">
      {galleys.map((galley) => {
        const href = galley.urlRemote ?? ojsLinks.galley(submissionId, galley.id);
        return (
          <a
            key={galley.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full bg-dark font-semibold text-white transition-colors hover:bg-primary hover:text-dark ${pad}`}
          >
            <span aria-hidden>↓</span>
            {galley.label ?? "Full text"}
          </a>
        );
      })}
    </div>
  );
}
