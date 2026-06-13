import Link from "next/link";
import type { Issue } from "@/lib/ojs/types";
import { localize } from "@/lib/ojs/localize";
import { formatDate } from "@/lib/format";

/** Issue summary card (mirrors issue_summary.tpl) used on the archive + home. */
export function IssueCard({ issue, featured = false }: { issue: Issue; featured?: boolean }) {
  const title = localize(issue.title);
  const cover = localize(issue.coverImageUrl);
  const count = issue.articles?.length ?? 0;

  return (
    <Link
      href={`/issues/${issue.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative flex items-end ${featured ? "aspect-[16/10]" : "aspect-[4/3]"} bg-paper`}
      >
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={localize(issue.coverImageAltText) || issue.identification || title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-5xl font-extrabold text-line">
              {issue.volume ? `Vol. ${issue.volume}` : "Issue"}
            </span>
          </div>
        )}
        <span className="relative m-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-dark">
          {issue.identification ?? `Vol. ${issue.volume ?? ""} No. ${issue.number ?? ""}`}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        {title && <h3 className="text-lg font-bold text-dark group-hover:text-primary">{title}</h3>}
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-semibold tracking-wide text-muted uppercase">
          {issue.datePublished && <span>{formatDate(issue.datePublished)}</span>}
          {count > 0 && <span className="text-line">·</span>}
          {count > 0 && <span>{count} {count === 1 ? "article" : "articles"}</span>}
        </div>
      </div>
    </Link>
  );
}
