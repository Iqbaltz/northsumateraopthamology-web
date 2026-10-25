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

export const issuesContent = {
  /** Shown on /issues in place of the issue while OJS has nothing published. */
  empty: {
    breadcrumb: [
      { label: "Homepage", href: "/" },
      { label: "Current Issue", href: "/issues" },
    ],
    kicker: "NEW ISSUE",
    title: "No issue published yet",
    text: "The latest issue of JONSON and its articles will appear here as soon as it is published. Manuscripts are welcome in the meantime.",
    submitButton: "SUBMIT A MANUSCRIPT",
  },
  articles: {
    title: "ARTICLES FROM CURRENT ISSUE",
  },
  catalog: {
    title: "Volume\nCatalog",
    description:
      "Published quarterly, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
    viewAll: "VIEW ALL VOLUMES",
    /** Shown in place of the volume cards while OJS has nothing published. */
    empty: "No volumes have been published yet.",
  },
};
