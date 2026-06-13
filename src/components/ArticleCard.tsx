import Link from "next/link";
import type { Article, Section } from "@/lib/ojs/types";
import { articleView, sectionTitle } from "@/lib/ojs/article";
import { GalleyLinks } from "./GalleyLinks";

/** Article summary in an issue's table of contents (mirrors article_summary.tpl). */
export function ArticleCard({
  article,
  sections,
}: {
  article: Article;
  sections?: Section[];
}) {
  const view = articleView(article);
  const section = sectionTitle(sections, view.sectionId);

  return (
    <article className="flex flex-col gap-3 border-b border-line py-7 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-wide text-muted uppercase">
        {section && <span>{section}</span>}
        {view.pages && <span className="text-line">·</span>}
        {view.pages && <span>pp. {view.pages}</span>}
      </div>

      <h3 className="text-xl font-bold text-dark">
        <Link href={`/articles/${article.id}`} className="hover:text-primary">
          {view.title}
        </Link>
      </h3>

      {view.authors && <p className="text-sm text-slate">{view.authors}</p>}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        {view.doi ? (
          <span className="text-xs text-muted">DOI: {view.doi}</span>
        ) : (
          <span />
        )}
        <GalleyLinks submissionId={article.id} galleys={view.galleys} />
      </div>
    </article>
  );
}
