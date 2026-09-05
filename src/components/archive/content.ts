import type { BreadcrumbItem } from "@/components/Breadcrumb";
import type { VolumeCatalogItem } from "@/components/VolumeCard";
import { articlesForIssue, journal, type IssueArticle } from "@/components/issues/journal";
import type { IssueHero } from "@/components/issues/IssueSections";

const MONTH_ABBREVIATION: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  August: "Aug",
};

/** Publication date OJS stamps on an issue: the last day of its cover month. */
const MONTH_LAST_DAY: Record<string, string> = {
  January: "31-01",
  February: "28-02",
  August: "31-08",
};

const DEFAULT_P1 =
  "This issue collects peer-reviewed contributions from across ophthalmology and visual science, spanning original research, clinical studies, review articles, and case reports.";
const DEFAULT_P2 =
  "Every article in this volume remains openly available, with full text and supplementary material archived for long-term access.";

export type ArchiveIssue = {
  slug: string;
  volume: number;
  number: number;
  month: string;
  year: number;
  articleCount: number;
  p1: string;
  p2: string;
};

type IssueSeed = Omit<ArchiveIssue, "slug" | "p1" | "p2"> &
  Partial<Pick<ArchiveIssue, "p1" | "p2">>;

const seeds: IssueSeed[] = [
  { volume: 13, number: 1, month: "January", year: 2024, articleCount: 12 },
  { volume: 12, number: 2, month: "August", year: 2024, articleCount: 11 },
  { volume: 12, number: 1, month: "February", year: 2024, articleCount: 10 },
  { volume: 11, number: 2, month: "August", year: 2023, articleCount: 12 },
  { volume: 11, number: 1, month: "February", year: 2023, articleCount: 9 },
  { volume: 10, number: 2, month: "August", year: 2022, articleCount: 10 },
  { volume: 10, number: 1, month: "February", year: 2022, articleCount: 11 },
  { volume: 9, number: 2, month: "August", year: 2021, articleCount: 9 },
  { volume: 9, number: 1, month: "February", year: 2021, articleCount: 12 },
  { volume: 8, number: 2, month: "August", year: 2020, articleCount: 10 },
  { volume: 8, number: 1, month: "February", year: 2020, articleCount: 8 },
  { volume: 7, number: 2, month: "August", year: 2019, articleCount: 11 },
  { volume: 7, number: 1, month: "February", year: 2019, articleCount: 9 },
  { volume: 6, number: 2, month: "August", year: 2018, articleCount: 10 },
  { volume: 6, number: 1, month: "February", year: 2018, articleCount: 8 },
  { volume: 5, number: 2, month: "August", year: 2017, articleCount: 9 },
];

export const archiveIssues: ArchiveIssue[] = seeds.map((seed) => ({
  ...seed,
  slug: `vol-${seed.volume}-no-${seed.number}`,
  p1: seed.p1 ?? DEFAULT_P1,
  p2: seed.p2 ?? DEFAULT_P2,
}));

export function findArchiveIssue(slug: string): ArchiveIssue | undefined {
  return archiveIssues.find((issue) => issue.slug === slug);
}

/** "Vol. 12 No. 2 (Aug 2024)" — how OJS labels an issue in a breadcrumb. */
export function issueIdentifier(issue: ArchiveIssue): string {
  const month = MONTH_ABBREVIATION[issue.month] ?? issue.month;
  return `Vol. ${issue.volume} No. ${issue.number} (${month} ${issue.year})`;
}

export function archiveIssueCard(issue: ArchiveIssue): VolumeCatalogItem {
  return {
    cover: journal.cover,
    alt: `JONSON Journal Volume ${issue.volume} Number ${issue.number} cover`,
    label: `VOLUME ${issue.volume} • NUMBER ${issue.number}`,
    published: `Published ${issue.month} ${issue.year}`,
    href: `/archive/${issue.slug}`,
  };
}

/** An archived issue reuses the current-issue hero, minus the "view issue" call to action. */
export function archiveIssueHero(issue: ArchiveIssue): IssueHero {
  return {
    breadcrumb: [
      { label: "Homepage", href: "/" },
      { label: "Archive", href: "/archive" },
      { label: `${issueIdentifier(issue)}: ${journal.name}`, href: `/archive/${issue.slug}` },
    ],
    kicker: "ARCHIVED",
    volumeTitle: `VOLUME ${issue.volume}\nNUMBER ${issue.number}`,
    publishMonth: `${issue.month} ${issue.year}`,
    description: journal.issueDescription,
    cover: journal.cover,
    coverAlt: `JONSON Journal Volume ${issue.volume} Number ${issue.number} cover`,
    issnOnline: journal.issnOnline,
    issnPrint: journal.issnPrint,
    downloadLabel: journal.downloadLabel,
    publishedOn: `Published: ${MONTH_LAST_DAY[issue.month] ?? "01-01"}-${issue.year}`,
    heading: `VOLUME ${issue.volume} – NUMBER ${issue.number}`,
    p1: issue.p1,
    p2: issue.p2,
    facts: [
      { title: `${issue.articleCount} Articles`, text: journal.articlesFactText },
      journal.openAccessFact,
    ],
  };
}

export function archiveIssueArticles(issue: ArchiveIssue): IssueArticle[] {
  return articlesForIssue(issue.articleCount);
}

export const archiveContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
  ] as BreadcrumbItem[],
  title: "Archive Catalog",
  description:
    "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
  viewAll: "VIEW ALL VOLUMES",
  articlesTitle: "ARTICLES FROM THIS ISSUE",
  volumes: archiveIssues.map(archiveIssueCard),
};
