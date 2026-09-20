/**
 * Journal-level data shared by the current issue (/issues), every archived
 * issue (/archive/[slug]) and article pages (/articles/[slug]). Kept free of
 * imports from any of them so all can use it without a cycle.
 */

export type ArticleAuthor = {
  name: string;
  /** Post-nominal letters shown on article cards, e.g. "MD". */
  credentials?: string;
  affiliation: string;
};

export type IssueArticle = {
  slug: string;
  image: string;
  alt: string;
  tag: string;
  title: string;
  authors: ArticleAuthor[];
  date: string;
  pages: string;
  format: "PDF" | "DOCX" | "HTML";
  /** The article's page on this site. */
  href: string;
  /** Full-text galley; a placeholder until galleys come from OJS. */
  downloadHref: string;
};

const ISSN_ONLINE = "2460-545X";
const ISSN_PRINT = "0126-1193";

export const journal = {
  name: "JONSON: Journal of North Sumatera Ophthalmology Nexus",
  title: "Journal of North Sumatera Ophthalmology Nexus",
  issn: { online: ISSN_ONLINE, print: ISSN_PRINT },
  issnOnline: `Online ISSN : ${ISSN_ONLINE}`,
  issnPrint: `Print ISSN : ${ISSN_PRINT}`,
  publisher: "Rumah Sakit Khusus Mata Mencirim 77 Medan",
  languages: "English and Indonesian",
  frequency: "Biannual (February and August)",
  peerReview: "Double-blind peer review",
  /** 10.0000 is a placeholder prefix — no DOIs are registered for the journal yet. */
  doiPrefix: "10.0000/jonson",
  downloadLabel: "Download This Journal",
  cover: "journal-cover.webp",
  issueDescription:
    "Explore the latest research on retinal diseases, glaucoma, corneal disorders and more.",
  openAccessFact: {
    title: "Open Access",
    text: "Freely available to readers worldwide",
  },
  articlesFactText: "Original research, reviews, and clinical reports",
};

/**
 * Resolvable DOI for an issue, e.g. "https://doi.org/10.0000/jonson.v12i1".
 * Built from `journal.doiPrefix`, so it stays a placeholder until real DOIs are
 * registered — see the note on that field.
 */
export function issueDoiUrl(volume: number, number: number): string {
  return `https://doi.org/${journal.doiPrefix}.v${volume}i${number}`;
}

/** URL-safe slug for an article title: "Use of VR in X" -> "use-of-vr-in-x". */
export function articleSlug(title: string): string {
  return title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function articlePath(title: string): string {
  return `/articles/${articleSlug(title)}`;
}

/** "Sarah Johnson, MD, Michael Lee, PhD" — the byline article cards show. */
export function authorLine(authors: ArticleAuthor[]): string {
  return authors
    .map((author) => (author.credentials ? `${author.name}, ${author.credentials}` : author.name))
    .join(", ");
}

/** Placeholder affiliation from the article design, until author data comes from OJS. */
const PLACEHOLDER_AFFILIATION = "Akademi Optometri Sumatera, Medan, Indonesia";

type ArticleSeed = Omit<IssueArticle, "slug" | "href" | "downloadHref" | "authors"> & {
  authors: [name: string, credentials: string][];
};

const seeds: ArticleSeed[] = [
  {
    image: "article-1.webp",
    alt: "AI efficacy in diabetic retinopathy screening research",
    tag: "Case Study",
    title: "Efficacy of Artificial Intelligence in Diabetic Retinopathy Screening",
    authors: [
      ["Sarah Johnson", "MD"],
      ["Michael Lee", "PhD"],
      ["Priya Shah", "MD"],
    ],
    date: "May 26, 2024",
    pages: "1–8",
    format: "PDF",
  },
  {
    image: "article-2.webp",
    alt: "Machine learning advances for early ocular cancer detection",
    tag: "Literature Review",
    title: "Advancements in Machine Learning for Early Cancer Detection",
    authors: [
      ["David Kim", "PhD"],
      ["Amina Yusuf", "MD"],
    ],
    date: "April 15, 2024",
    pages: "9–17",
    format: "PDF",
  },
  {
    image: "article-3.webp",
    alt: "VR therapy impact on vision-related trauma recovery",
    tag: "Original Research",
    title: "Impact of Virtual Reality Therapy on PTSD Recovery Rates",
    authors: [
      ["Liam O’Connor", "MD"],
      ["Sofia Martinez", "PhD"],
    ],
    date: "June 10, 2024",
    pages: "18–26",
    format: "PDF",
  },
  {
    image: "article-4.webp",
    alt: "Telemedicine and teleophthalmology adoption in rural clinics",
    tag: "Case Study",
    title: "Telemedicine Adoption in Rural Healthcare Facilities during COVID-19",
    authors: [
      ["Chen Wei", "MD"],
      ["Fatima Al-Mansouri", "MPH"],
    ],
    date: "April 15, 2024",
    pages: "27–34",
    format: "PDF",
  },
  {
    image: "article-2.webp",
    alt: "Early cancer diagnostics supported by artificial intelligence",
    tag: "Case Study",
    title: "Implementing AI for Early Cancer Diagnostics in Urban Clinics",
    authors: [
      ["Arief Nugroho", "PhD"],
      ["Sari Dewi", "MD"],
    ],
    date: "March 22, 2024",
    pages: "35–41",
    format: "DOCX",
  },
  {
    image: "article-3.webp",
    alt: "Wearable devices supporting diabetes management in older patients",
    tag: "Case Study",
    title: "Effect of Wearable Devices on Diabetes Management in Elderly Patients",
    authors: [
      ["Lina Hartati", "MPH"],
      ["Budi Santoso", "MD"],
    ],
    date: "May 10, 2024",
    pages: "42–49",
    format: "PDF",
  },
  {
    image: "article-1.webp",
    alt: "Mobile application for adolescent mental health counselling",
    tag: "Case Study",
    title: "Evaluating Mobile Applications for Adolescent Mental Health Counselling",
    authors: [
      ["Indah Pratiwi", "MSc"],
      ["Ahmad Fauzi", "PsyD"],
    ],
    date: "June 5, 2024",
    pages: "50–57",
    format: "HTML",
  },
  {
    image: "article-4.webp",
    alt: "Chatbot assistance in primary healthcare services",
    tag: "Case Study",
    title: "Optimising Chatbot Use in Primary Healthcare Services",
    authors: [
      ["Rizky Ananda", "MPH"],
      ["Maya Putri", "MD"],
    ],
    date: "April 30, 2024",
    pages: "58–64",
    format: "PDF",
  },
  {
    image: "article-3.webp",
    alt: "Telemonitoring and treatment adherence in cataract patients",
    tag: "Literature Review",
    title: "Influence of Telemonitoring on Treatment Adherence in Cataract Patients",
    authors: [
      ["Dewi Kurniawati", "MD"],
      ["Faisal Rahman", "MPH"],
    ],
    date: "May 18, 2024",
    pages: "65–73",
    format: "DOCX",
  },
  {
    image: "article-2.webp",
    alt: "Blockchain applied to hospital patient data security",
    tag: "Literature Review",
    title: "Implementing Blockchain for Patient Data Security in Hospitals",
    authors: [
      ["Hendra Setiawan", "PhD"],
      ["Lestari Putri", "MD"],
    ],
    date: "April 12, 2024",
    pages: "74–82",
    format: "PDF",
  },
  {
    image: "article-1.webp",
    alt: "Virtual reality supported post-stroke rehabilitation",
    tag: "Original Research",
    title: "Use of Virtual Reality in Post-Stroke Rehabilitation",
    authors: [
      ["Nadia Safitri", "MSc"],
      ["Rudi Hartono", "MD"],
    ],
    date: "May 28, 2024",
    pages: "83–91",
    format: "PDF",
  },
  {
    image: "article-4.webp",
    alt: "Big data analysis for infectious disease outbreak prediction",
    tag: "Case Study",
    title: "Analysing Big Data for Infectious Disease Outbreak Prediction",
    authors: [
      ["Yusuf Ramadhan", "PhD"],
      ["Sinta Melati", "MPH"],
    ],
    date: "June 1, 2024",
    pages: "92–99",
    format: "PDF",
  },
];

/** Placeholder table of contents; each issue shows the first `articleCount` of these. */
export const issueArticles: IssueArticle[] = seeds.map((seed) => ({
  ...seed,
  slug: articleSlug(seed.title),
  href: articlePath(seed.title),
  downloadHref: "#",
  authors: seed.authors.map(([name, credentials]) => ({
    name,
    credentials,
    affiliation: PLACEHOLDER_AFFILIATION,
  })),
}));

/** The first `count` articles, clamped to what the placeholder list holds. */
export function articlesForIssue(count: number): IssueArticle[] {
  return issueArticles.slice(0, Math.min(count, issueArticles.length));
}
