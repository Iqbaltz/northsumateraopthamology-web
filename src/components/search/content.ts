import type { BreadcrumbItem } from "@/components/Breadcrumb";
import type { AbstractPart } from "@/components/article/content";
import type { IssueArticle } from "@/components/issues/journal";

/** Where the query is matched; "all" also covers the byline. */
export type SearchField = "all" | "title" | "abstract" | "keywords";

/** Everything the search page reads from its URL. */
export type SearchValues = {
  query: string;
  field: SearchField;
  authors: string;
  /** ISO `yyyy-mm-dd`, as a native date input gives it; "" when unset. */
  publishedAfter: string;
  publishedBefore: string;
  /** A "Past N months" preset, in months; "" when unset. */
  within: string;
  /** Article types (OJS section ids) to keep; empty keeps every type. */
  types: number[];
  perPage: number;
};

/** One article as the results list shows it. */
export type SearchResult = {
  slug: string;
  tag: string;
  /** The issue's full name as OJS shows it, e.g. "Vol. 1 No. 02 (2026): <issue title>". */
  issue: string;
  title: string;
  href: string;
  authors: string;
  /** Opening part of the abstract; the card clamps it to two lines. */
  abstract?: AbstractPart;
  date: string;
  /** Resolvable DOI assigned in OJS; "" until there is one. */
  doi: string;
  format: IssueArticle["format"];
  /** Full-text galley to download; "" while OJS has no file for the article. */
  downloadHref: string;
};

/** An article type the filters offer: an OJS section with published articles. */
export type ArticleType = { id: number; label: string };

export const searchContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Search Result", href: "/search" },
  ] as BreadcrumbItem[],
  results: (total: number) =>
    `${total.toLocaleString("en-US")} ${total === 1 ? "Result" : "Results"} Found`,
  perPage: {
    label: "Results Per Page",
    options: [10, 20, 40],
    initial: 10,
  },
  filters: {
    title: "Advanced Filters",
    resetAll: "Reset All",
    author: "By Author",
  },
  date: {
    title: "Publication Date",
    reset: "Reset",
    publishedAfter: "Published After",
    publishedBefore: "Published Before",
    within: [
      { value: "3", label: "Past 3 months" },
      { value: "6", label: "Past 6 months" },
      { value: "12", label: "Past 12 months" },
      { value: "24", label: "Past 24 months" },
    ],
  },
  typesTitle: "Article Type",
  field: {
    label: "Search in",
    options: [
      { value: "all", label: "All Fields" },
      { value: "title", label: "Title" },
      { value: "abstract", label: "Abstract" },
      { value: "keywords", label: "Keywords" },
    ] as { value: SearchField; label: string }[],
  },
  query: "Title, keyword or author",
  submit: "Search",
  doi: "DOI:",
  empty: {
    title: "No articles found",
    text: "Try other keywords, search in all fields, or loosen the filters.",
    reset: "Reset all filters",
  },
};
