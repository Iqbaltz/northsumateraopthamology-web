import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { archiveIssueCard, archiveIssues } from "@/components/archive/content";
import type { IssueHero } from "./IssueSections";
import { issueArticles, issueDoiUrl, journal } from "./journal";

/** The issue /issues presents. Its articles cite it on their own pages. */
export const currentIssue = {
  volume: 12,
  number: 1,
  /** Breadcrumb form, as OJS labels an issue. */
  identifier: "Vol. 12 No. 1 (Jun 2026)",
  /** Citation form used beside the journal title. */
  citation: "Vol. 12 No. 1 (2026)",
  year: 2026,
  publishedOn: "30-06-2026",
  href: "/issues",
};

const hero: IssueHero = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
    { label: `${currentIssue.identifier}: ${journal.name}`, href: currentIssue.href },
  ] as BreadcrumbItem[],
  kicker: "NEW ISSUE",
  volumeTitle: "VOLUME 12\nNUMBER 1",
  publishMonth: "June 2026",
  description: journal.issueDescription,
  doi: issueDoiUrl(12, 1),
  cover: journal.cover,
  coverAlt: "JONSON Journal Volume 12 Number 1 cover",
  issnOnline: journal.issnOnline,
  issnPrint: journal.issnPrint,
  downloadLabel: journal.downloadLabel,
  publishedOn: `Published: ${currentIssue.publishedOn}`,
  heading: "VOLUME 12 – NUMBER 1",
  p1: "This issue brings together recent clinical and scientific contributions in ophthalmology, with a focus on advances in the diagnosis, management, and treatment of eye diseases.",
  p2: "Featuring original research, clinical studies, review articles, and case reports covering retinal diseases, glaucoma, corneal disorders, and other conditions affecting ocular health and vision.",
  facts: [
    { title: `${issueArticles.length} Articles`, text: journal.articlesFactText },
    journal.openAccessFact,
  ],
};

export const issuesContent = {
  hero,
  articles: {
    title: "ARTICLES FROM CURRENT ISSUE",
    items: issueArticles,
  },
  catalog: {
    title: "Volume\nCatalog",
    description:
      "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
    viewAll: "VIEW ALL VOLUMES",
    /** The three most recent archived volumes, so the cards link to real pages. */
    items: archiveIssues.slice(0, 3).map(archiveIssueCard),
  },
};
