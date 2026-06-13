import { localize } from "./localize";
import type { Article, Galley, Publication, Section } from "./types";

/** The publication OJS currently shows for an article (falls back to first). */
export function currentPublication(article: Article): Publication | undefined {
  return (
    article.publications?.find((p) => p.id === article.currentPublicationId) ??
    article.publications?.[0]
  );
}

/**
 * Normalize an article into display fields, tolerating both shapes the API uses:
 * fields on the publication, or inlined on the article (issue TOC summaries).
 */
export function articleView(article: Article, locale?: string) {
  const pub = currentPublication(article);
  const galleys: Galley[] = pub?.galleys ?? article.galleys ?? [];
  return {
    publication: pub,
    title: localize(pub?.fullTitle ?? pub?.title ?? article.fullTitle, locale) || "Untitled",
    authors: pub?.authorsString ?? article.authorsString ?? "",
    abstractHtml: localize(pub?.abstract, locale),
    pages: pub?.pages ?? article.pages ?? "",
    doi: pub?.doiObject?.doi ?? "",
    galleys,
    sectionId: pub?.sectionId ?? article.sectionId,
  };
}

export function sectionTitle(sections: Section[] | undefined, sectionId?: number, locale?: string) {
  const section = sections?.find((s) => s.id === sectionId);
  return section ? localize(section.title, locale) : "";
}
