import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { archiveIssueCard, archiveIssues } from "@/components/archive/content";
import type { IssueHero } from "./IssueSections";
import { issueArticles, journal } from "./journal";

const CURRENT_ISSUE_IDENTIFIER = "Vol. 12 No. 1 (Jun 2026)";

const hero: IssueHero = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
    { label: `${CURRENT_ISSUE_IDENTIFIER}: ${journal.name}`, href: "/issues" },
  ] as BreadcrumbItem[],
  kicker: "NEW ISSUE",
  volumeTitle: "VOLUME 12\nNUMBER 1",
  publishMonth: "June 2026",
  description: journal.issueDescription,
  viewIssue: { label: "VIEW ISSUE", href: "#" },
  cover: journal.cover,
  coverAlt: "JONSON Journal Volume 12 Number 1 cover",
  issnOnline: journal.issnOnline,
  issnPrint: journal.issnPrint,
  downloadLabel: journal.downloadLabel,
  publishedOn: "Published: 30-06-2026",
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
