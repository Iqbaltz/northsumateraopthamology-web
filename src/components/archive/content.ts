import type { BreadcrumbItem } from "@/components/Breadcrumb";

export const archiveContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
  ] as BreadcrumbItem[],
  title: "Archive Catalog",
  description:
    "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
  /** Three full rows of the four-column grid. */
  perPage: 12,
  articlesTitle: "ARTICLES FROM THIS ISSUE",
  /** Shown in place of the volume grid while OJS has nothing published. */
  empty: "No volumes have been published yet.",
};

/** The first page lives at the bare route; later ones add `?page=`. */
export function archivePagePath(page: number): string {
  return page > 1 ? `/archive?page=${page}` : "/archive";
}
