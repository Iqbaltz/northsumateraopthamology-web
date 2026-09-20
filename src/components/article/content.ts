import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { currentIssue } from "@/components/issues/content";
import { issueArticles, journal, type IssueArticle } from "@/components/issues/journal";

export type AbstractPart = { label: string; text: string };

/** One citation. Wrap a span in `*asterisks*` to italicise it (journal names, volumes). */
export type ArticleReference = { text: string; url?: string };

export type MonthlyDownloads = {
  /** Axis label, e.g. "Oct". */
  month: string;
  /** Full label for tooltips and the data table, e.g. "October 2025". */
  label: string;
  value: number;
};

export type ArticleDetail = {
  article: IssueArticle;
  breadcrumb: BreadcrumbItem[];
  doi: string;
  keywords: string[];
  abstract: AbstractPart[];
  references: ArticleReference[];
  downloads: MonthlyDownloads[];
  issue: typeof currentIssue & { cover: string; coverAlt: string };
  copyright: { notice: string; holder: string };
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Labels `values` as consecutive months ending at `end` (month is 1-based). */
function monthlySeries(end: { year: number; month: number }, values: number[]): MonthlyDownloads[] {
  return values.map((value, index) => {
    const date = new Date(Date.UTC(end.year, end.month - 1 - (values.length - 1 - index), 1));
    const name = MONTH_NAMES[date.getUTCMonth()];
    return { month: name.slice(0, 3), label: `${name} ${date.getUTCFullYear()}`, value };
  });
}

/*
 * Placeholder body from the article design, shared by every article until
 * abstracts, keywords, citations and usage stats come from OJS.
 */
const placeholderKeywords = [
  "community-based services",
  "eye health",
  "optical business",
  "refractive errors",
  "social entrepreneurship",
];

const placeholderAbstract: AbstractPart[] = [
  {
    label: "Introduction",
    text: "This study aims to analyze the transformation of a community-based health service program into a sustainable, community-based optical business model using a social entrepreneurship approach. This research is based on empirical data from 75 eyeglass recipients during a health service program held at the Bhayangkara Hospital, Yogyakarta Regional Police, from April to May 2026.",
  },
  {
    label: "Methods",
    text: "This study used a descriptive-analytical approach, examining patient characteristics, the distribution of refractive errors, lens types, and service coverage. The analysis was conducted using descriptive statistics and a clinical categorization approach to identify patterns of community optical service needs.",
  },
  {
    label: "Results",
    text: "The results showed that the majority of respondents experienced mild to moderate refractive errors, with a predominance of mild myopia and hyperopia. More than 60% of respondents required presbyopia correction (ADD), indicating a significant need in the late to late productive age group. Furthermore, a wide variety of astigmatism cases were identified, requiring more specific optical treatment.",
  },
  {
    label: "Conclusions",
    text: "The findings of this study indicate a high demand for affordable, sustainable, and community-based optical services. Therefore, this study proposes a social entrepreneurship-based optical business model that integrates aspects of healthcare, economic sustainability, and community empowerment.",
  },
];

const placeholderReferences: ArticleReference[] = [
  {
    text: "Athavina, I. A., Art, F., & Mariana. (2025). Identifikasi faktor risiko keratitis pada pengguna lensa kontak: Systematic review. *Oftalmologi: Jurnal Kesehatan Mata Indonesia*, *7*(1), 18–27.",
    url: "https://doi.org/10.11594/ojkmi.v7i1.81",
  },
  {
    text: "Bourne, R. R. A., Steinmetz, J. D., Flaxman, S., & Vos, T. (2021). Trends in prevalence of blindness and distance and near vision impairment over 30 years: An analysis for the Global Burden of Disease Study. *The Lancet Global Health*, *9*(2), e130–e143.",
    url: "https://doi.org/10.1016/S2214-109X(20)30425-3",
  },
  {
    text: "World Health Organization. (2021). *Blindness and vision impairment*.",
    url: "https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment",
  },
  {
    text: "Dees, J. G. (1998). *The meaning of social entrepreneurship*. Stanford University.",
    url: "https://centers.fuqua.duke.edu/case/wp-content/uploads/sites/7/2015/03/Article_Dees_MeaningofSocialEntrepreneurship_2001.pdf",
  },
  {
    text: "Fricke, T. R., Tahhan, N., Resnikoff, S., Papas, E., Burnett, A., Ho, S. M., Naidoo, K. S., & Holden, B. A. (2018). Global prevalence of presbyopia and vision impairment: Projections for 2015–2050. *Ophthalmology*, *125*(10), 1492–1499.",
    url: "https://doi.org/10.1016/j.ophtha.2018.04.013",
  },
  {
    text: "Bourne, R. R. A., Steinmetz, J. D., Flaxman, S. R., Briant, P. S., Taylor, H. R., Resnikoff, S., … & Vision Loss Expert Group. (2021). Trends in prevalence of blindness and distance and near vision impairment over 30 years: An analysis for the Global Burden of Disease Study. *The Lancet Global Health*, *9*(2), e130–e143.",
    url: "https://doi.org/10.1016/S2214-109X(20)30425-3",
  },
  {
    text: "Holden, B. A., Fricke, T. R., Wilson, D. A., Jong, M., Naidoo, K. S., Sankaridurg, P., … & Resnikoff, S. (2016). Global prevalence of myopia and high myopia and temporal trends from 2000 through 2050. *Ophthalmology*, *123*(5), 1036–1042.",
    url: "https://doi.org/10.1016/j.ophtha.2016.01.006",
  },
  {
    text: "Flaxman, S. R., Bourne, R. R. A., Resnikoff, S., Ackland, P., Braithwaite, T., Cicinelli, M. V., … & Vision Loss Expert Group. (2017). Global causes of blindness and distance vision impairment 1990–2020: A systematic review and meta-analysis. *The Lancet Global Health*, *5*(12), e1221–e1234.",
    url: "https://doi.org/10.1016/S2214-109X(17)30393-5",
  },
  {
    text: "Naidoo, K., Raghunandan, A., Mashige, K. P., Govender, P., Ramson, P., Holden, B. A., & Pokharel, G. P. (2013). Refractive error and visual impairment in African children in South Africa. *Investigative Ophthalmology & Visual Science*, *54*(9), 6710–6716.",
    url: "https://doi.org/10.1167/iovs.13-12183",
  },
  {
    text: "Resnikoff, S., Pascolini, D., Mariotti, S. P., & Pokharel, G. P. (2008). Global magnitude of visual impairment caused by uncorrected refractive errors in 2004. *Bulletin of the World Health Organization*, *86*(1), 63–70.",
    url: "https://doi.org/10.2471/BLT.07.041210",
  },
  {
    text: "World Health Organization. (2019). *World report on vision*. Geneva: WHO Press.",
    url: "https://www.who.int/publications/i/item/world-report-on-vision",
  },
];

/** The last twelve months of downloads, ending with the month of the latest report. */
const placeholderDownloads = monthlySeries(
  { year: 2026, month: 9 },
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
);

export const articleContent = {
  doiLabel: "DOI:",
  keywordsLabel: "Keywords:",
  publishedLabel: "Published:",
  viewIssue: "VIEW ISSUE",
  downloadLabel: "Download",
  sectionLabel: "Section:",
  licenseLabel: "License:",
  abstractTitle: "Abstract",
  metrics: {
    title: "Download Metrics",
    unit: { one: "download", other: "downloads" },
  },
  referencesTitle: "References",
  similarTitle: "Similar Articles",
};

export function findArticle(slug: string): IssueArticle | undefined {
  return issueArticles.find((article) => article.slug === slug);
}

export function articleDetail(article: IssueArticle): ArticleDetail {
  const position = String(issueArticles.indexOf(article) + 1).padStart(2, "0");

  return {
    article,
    // OJS article pages end the trail on the article's section, not its title.
    breadcrumb: [
      { label: "Homepage", href: "/" },
      { label: "Archive", href: "/archive" },
      { label: `${currentIssue.identifier}: ${journal.name}`, href: currentIssue.href },
      { label: article.tag, href: article.href },
    ],
    doi: `https://doi.org/${journal.doiPrefix}.v${currentIssue.volume}i${currentIssue.number}.${position}`,
    keywords: placeholderKeywords,
    abstract: placeholderAbstract,
    references: placeholderReferences,
    downloads: placeholderDownloads,
    issue: {
      ...currentIssue,
      cover: journal.cover,
      coverAlt: `JONSON Journal ${currentIssue.citation} cover`,
    },
    copyright: { notice: `Copyright (c) ${currentIssue.year}`, holder: journal.title },
  };
}

/**
 * Up to `count` other articles, those from the same section first. Stable sort,
 * so each group keeps its table-of-contents order.
 */
export function similarArticles(article: IssueArticle, count = 8): IssueArticle[] {
  return issueArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) => Number(b.tag === article.tag) - Number(a.tag === article.tag))
    .slice(0, count);
}
