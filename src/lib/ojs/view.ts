import "server-only";
import type { VolumeCatalogItem } from "@/components/VolumeCard";
import type { ArticlePreview } from "@/components/landing/content";
import {
  articlePath,
  articleSlug,
  issnLines,
  journal,
  missingIssn,
  type ArticleAuthor,
  type IssueArticle,
  type JournalIssn,
} from "@/components/issues/journal";
import { formatDate } from "../format";
import { fileLinks } from "../links";
import { articleView, sectionTitle } from "./article";
import {
  getContext,
  getCurrentIssue,
  getDownloadTimeline,
  getIssue,
  getIssues,
  getPublication,
  type TimelinePoint,
} from "./index";
import { localize } from "./localize";
import {
  monthlySeries,
  type AbstractPart,
  type ArticleDetail,
  type MonthlyDownloads,
} from "@/components/article/content";
import type { IssueHero } from "@/components/issues/IssueSections";
import type { ArticleType } from "@/components/search/content";
import type { SearchRecord } from "../search";
import type { DoiObject, Issue, Publication, Section } from "./types";

/** Resolvable link for a DOI assigned in OJS, or "" while there is none. */
function doiUrl(doi?: DoiObject | null): string {
  if (!doi?.doi) return "";
  return doi.resolvingUrl || `https://doi.org/${doi.doi}`;
}

/**
 * Maps published OJS content onto the landing page's view shapes.
 *
 * Every function degrades to an empty result rather than throwing, so the page
 * can fall back to its designed placeholder content whenever the journal has
 * nothing published yet or the API is unreachable.
 */

/** The journal's ISSNs from OJS's journal settings; "-" for any not set there yet. */
export async function getJournalIssn(): Promise<JournalIssn> {
  try {
    const context = await getContext();
    return {
      online: context.onlineIssn || missingIssn.online,
      print: context.printIssn || missingIssn.print,
    };
  } catch {
    return missingIssn;
  }
}

/** Issue artwork uploaded in OJS, falling back to the journal's stock cover. */
function issueCover(issue: Issue): string {
  return localize(issue.coverImageUrl) || journal.cover;
}

/** OJS 3.5 keeps keywords as `{ en: [{ name }] }`. */
function toKeywords(raw: Publication["keywords"]): string[] {
  if (!raw) return [];
  const entries = Object.values(raw).find((value) => Array.isArray(value) && value.length);
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => (typeof entry === "string" ? entry : entry?.name))
    .filter((name): name is string => Boolean(name));
}

/** OJS 3.5 keeps affiliations as a list of ROR-aware objects. */
function toAuthors(authors: Publication["authors"], fallbackByline: string): ArticleAuthor[] {
  if (!authors?.length) {
    return [{ name: fallbackByline, affiliation: "" }];
  }
  return authors.map((author) => ({
    name: author.fullName ?? localize(author.preferredPublicName) ?? "",
    affiliation:
      localize(author.affiliations?.[0]?.name) || localize(author.affiliation) || "",
  }));
}

/**
 * Structured abstracts read "Background: …", "Objective: …". Split those into
 * the labelled parts the article page renders; unlabelled text stays one part.
 */
function toAbstract(html: string): AbstractPart[] {
  return html
    .split(/<\/p>/i)
    .map((chunk) => firstParagraph(`${chunk}</p>`, 4000))
    .filter(Boolean)
    .map((text) => {
      const match = text.match(/^([A-Z][A-Za-z ]{2,24}):\s*([\s\S]+)$/);
      return match ? { label: match[1], text: match[2] } : { label: "", text };
    });
}

/** OJS appends the contributor role to the byline: "Jane Doe (Author)". */
function cleanByline(authors: string): string {
  return authors
    .replace(/\s*\((?:Author|Penulis|Translator|Editor)\)/gi, "")
    .replace(/\s*,\s*$/, "")
    .trim();
}

/** Whole rich-text field as plain text, paragraphs joined by a space. */
function plainText(html: string, maxLength = 900): string {
  const text = html
    .split(/<\/p>/i)
    .map((chunk) => firstParagraph(`${chunk}</p>`, maxLength))
    .filter(Boolean)
    .join(" ");

  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength))}…`;
}

/**
 * OJS stores rich text as HTML. Takes the first paragraph as plain text, capped
 * so a single field cannot blow past its slot.
 */
function firstParagraph(html: string, maxLength = 180): string {
  const [first = ""] = html.split(/<\/p>/i);
  const text = first
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength))}…`;
}

function toPreview(issue: Issue, article: NonNullable<Issue["articles"]>[number]): ArticlePreview {
  const view = articleView(article);
  const tag = sectionTitle(issue.sections, view.sectionId) || "Article";
  const published = view.publication?.datePublished ?? issue.datePublished;

  return {
    tag,
    title: view.title,
    author: cleanByline(view.authors),
    date: formatDate(published),
    href: articlePath(view.title),
  };
}

/** The newest published articles, newest issue first. Empty when nothing is published. */
export async function getLatestArticles(limit: number): Promise<ArticlePreview[]> {
  try {
    const issue = await getCurrentIssue();
    if (!issue?.articles?.length) return [];

    return issue.articles.slice(0, limit).map((article) => toPreview(issue, article));
  } catch {
    return [];
  }
}

export type CurrentIssueSummary = {
  /** The issue card heading: OJS's identification, as the article page shows it. */
  volumeTitle: string;
  publishMonth: string;
  description: string;
  identification: string;
  href: string;
  articleCount: number;
  cover: string;
  coverAlt: string;
};

/**
 * The issue's full name as OJS shows it, e.g. "Vol. 1 No. 02 (2026): <issue title>",
 * falling back to the same "Vol. 1 No. 02 (2026)" shape when OJS sends none.
 */
function issueTitle(issue: Issue): string {
  return (
    localize(issue.identification) ||
    [
      issue.volume && `Vol. ${issue.volume}`,
      issue.number && `No. ${issue.number}`,
      issue.year && `(${issue.year})`,
    ]
      .filter(Boolean)
      .join(" ")
  );
}

/** Headline facts about the issue OJS currently marks as current. */
export async function getCurrentIssueSummary(): Promise<CurrentIssueSummary | undefined> {
  try {
    const issue = await getCurrentIssue();
    if (!issue) return undefined;

    return {
      volumeTitle: issueTitle(issue),
      publishMonth: formatDate(issue.datePublished),
      // Full text; the card clamps it to five lines.
      description: plainText(localize(issue.description)) || journal.issueDescription,
      identification: localize(issue.identification),
      href: "/issues",
      articleCount: issue.articles?.length ?? 0,
      cover: issueCover(issue),
      coverAlt:
        localize(issue.coverImageAltText) ||
        `${localize(issue.identification) || journal.title} cover`,
    };
  } catch {
    return undefined;
  }
}

// --- Volumes (archive) ---

/** Same slug shape the static archive used, so existing links keep working. */
export function issueSlug(issue: Issue): string {
  return `vol-${issue.volume ?? 0}-no-${issue.number ?? 0}`;
}

function toVolumeCard(issue: Issue, articleCount?: number): VolumeCatalogItem {
  return {
    cover: issueCover(issue),
    alt: `${journal.title} Volume ${issue.volume} Number ${issue.number} cover`,
    label: issueTitle(issue),
    published: `Published ${formatDate(issue.datePublished)}`,
    href: `/archive/${issueSlug(issue)}`,
    articleCount,
  };
}

/**
 * The issue list omits the table of contents, so each issue is hydrated to
 * count its articles. Responses are cached, so this costs one round trip per
 * issue per revalidation window.
 */
function toHydratedVolumeCards(issues: Issue[]): Promise<VolumeCatalogItem[]> {
  return Promise.all(
    issues.map(async (summary) => {
      const issue = (await getIssue(summary.id)) ?? summary;
      return toVolumeCard(issue, issue.articles?.length);
    }),
  );
}

/** Published volumes, newest first. Empty when the journal has none. */
export async function getVolumeCards(limit?: number): Promise<VolumeCatalogItem[]> {
  try {
    const issues = await getIssues();
    return await toHydratedVolumeCards(limit ? issues.slice(0, limit) : issues);
  } catch {
    return [];
  }
}

export type VolumeCardPage = {
  volumes: VolumeCatalogItem[];
  /** 1-based page number. */
  page: number;
  totalPages: number;
};

/** One page of published volumes, newest first. Only that page's issues are hydrated. */
export async function getVolumeCardPage(page: number, perPage: number): Promise<VolumeCardPage> {
  try {
    const issues = await getIssues();
    const start = (page - 1) * perPage;
    return {
      volumes: await toHydratedVolumeCards(issues.slice(start, start + perPage)),
      page,
      totalPages: Math.ceil(issues.length / perPage),
    };
  } catch {
    return { volumes: [], page, totalPages: 0 };
  }
}

/** Slugs for every published volume, for `generateStaticParams`. */
export async function getVolumeSlugs(): Promise<string[]> {
  try {
    return (await getIssues()).map(issueSlug);
  } catch {
    return [];
  }
}

// --- Articles ---

/** OJS galley labels are free text ("Journal PDF"); map them to the badge we show. */
function galleyFormat(label: string, mimetype?: string): IssueArticle["format"] {
  const haystack = `${label} ${mimetype ?? ""}`.toLowerCase();
  if (haystack.includes("html")) return "HTML";
  if (haystack.includes("doc")) return "DOCX";
  return "PDF";
}

function toIssueArticle(issue: Issue, article: NonNullable<Issue["articles"]>[number]): IssueArticle {
  const view = articleView(article);
  const galley = view.galleys[0];
  const title = view.title;

  return {
    slug: articleSlug(title),
    image: issueCover(issue),
    alt: `Cover of ${localize(issue.identification) || journal.title}`,
    tag: sectionTitle(issue.sections, view.sectionId) || "Article",
    title,
    // OJS exposes only a byline string here, not structured contributors.
    authors: [{ name: cleanByline(view.authors), affiliation: "" }],
    date: formatDate(view.publication?.datePublished ?? issue.datePublished),
    pages: view.pages,
    format: galley ? galleyFormat(galley.label ?? "", galley.file?.mimetype) : "PDF",
    href: articlePath(title),
    // A remote galley lives elsewhere (e.g. a shared drive); the rest are served from this
    // site. No galley in OJS means no file yet, and the buttons show as unavailable.
    downloadHref: galley ? galley.urlRemote || fileLinks.article(article.id, galley.id, true) : "",
  };
}

export type OjsIssueView = {
  issue: Issue;
  identification: string;
  articles: IssueArticle[];
};

/** One published volume with its table of contents, addressed by our slug. */
export async function getIssueBySlug(slug: string): Promise<OjsIssueView | undefined> {
  try {
    const match = (await getIssues()).find((i) => issueSlug(i) === slug);
    if (!match) return undefined;

    // The list omits the table of contents; hydrate it.
    const issue = (await getIssue(match.id)) ?? match;
    return {
      issue,
      identification: issueTitle(issue),
      articles: (issue.articles ?? []).map((article) => toIssueArticle(issue, article)),
    };
  } catch {
    return undefined;
  }
}

/** Every published article across every volume, for article pages. */
export async function getAllArticles(): Promise<IssueArticle[]> {
  try {
    const issues = await getIssues();
    const results: IssueArticle[] = [];

    for (const summary of issues) {
      const issue = (await getIssue(summary.id)) ?? summary;
      for (const article of issue.articles ?? []) {
        results.push(toIssueArticle(issue, article));
      }
    }
    return results;
  } catch {
    return [];
  }
}

// --- Search ---

/** One published article for the search page, with the text it is matched on. */
async function toSearchRecord(
  issue: Issue,
  raw: NonNullable<Issue["articles"]>[number],
): Promise<SearchRecord> {
  const article = toIssueArticle(issue, raw);
  const view = articleView(raw);
  // The table of contents ships a summary only; abstract, keywords and the DOI
  // need the full publication record.
  const full = view.publication?.id ? await getPublication(raw.id, view.publication.id) : undefined;
  const publication = full ?? view.publication;
  const abstract = toAbstract(localize(publication?.abstract));
  const byline = article.authors[0]?.name ?? "";

  return {
    result: {
      slug: article.slug,
      tag: article.tag,
      issue: issueTitle(issue),
      title: article.title,
      href: article.href,
      authors: byline,
      abstract: abstract[0],
      date: article.date,
      doi: doiUrl(publication?.doiObject),
      format: article.format,
      downloadHref: article.downloadHref,
    },
    sectionId: view.sectionId,
    publishedOn: (view.publication?.datePublished ?? issue.datePublished ?? "").slice(0, 10),
    text: {
      title: article.title,
      // The byline can abbreviate given names; the contributor records spell them out.
      authors: [byline, ...toAuthors(publication?.authors, "").map((author) => author.name)].join(" "),
      abstract: abstract.map((part) => `${part.label} ${part.text}`).join(" "),
      keywords: toKeywords(publication?.keywords).join(" "),
    },
  };
}

export type SearchIndex = {
  records: SearchRecord[];
  /** The OJS sections the published articles fall under, in the journal's order. */
  articleTypes: ArticleType[];
};

/**
 * Every published article, ready to search, with the article types to filter
 * by. Responses are cached, so this costs one round trip per issue and article
 * per revalidation window.
 */
export async function getSearchIndex(): Promise<SearchIndex> {
  try {
    const issues = await Promise.all(
      (await getIssues()).map(async (summary) => (await getIssue(summary.id)) ?? summary),
    );
    const records = await Promise.all(
      issues.flatMap((issue) =>
        (issue.articles ?? []).map((article) => toSearchRecord(issue, article)),
      ),
    );

    const used = new Set(records.map((record) => record.sectionId));
    const sections = new Map<number, Section>();
    for (const section of issues.flatMap((issue) => issue.sections ?? [])) {
      if (used.has(section.id) && !sections.has(section.id)) sections.set(section.id, section);
    }

    return {
      records,
      articleTypes: [...sections.values()]
        .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
        .map((section) => ({ id: section.id, label: localize(section.title) }))
        .filter((type) => type.label),
    };
  } catch {
    return { records: [], articleTypes: [] };
  }
}

/** The issue's full-text file, served from this site unless OJS links it elsewhere. */
function issueFile(issue: Issue): IssueHero["file"] {
  const [galley] = [...(issue.galleys ?? [])].sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
  if (!galley) return undefined;
  if (galley.urlRemote) return { downloadHref: galley.urlRemote };

  const galleyId = galley.urlPublished?.split("/").pop();
  if (!galleyId) return undefined;
  return {
    previewHref: fileLinks.issue(issue.id, galleyId),
    downloadHref: fileLinks.issue(issue.id, galleyId, true),
  };
}

/** Splits an OJS rich-text field into the two paragraphs the issue hero shows. */
function twoParagraphs(html: string): [string, string] {
  const parts = html
    .split(/<\/p>/i)
    .map((chunk) => firstParagraph(`${chunk}</p>`, 600))
    .filter(Boolean);
  return [parts[0] ?? "", parts[1] ?? ""];
}

export type IssueView = {
  identifier: string;
  hero: IssueHero;
  articles: IssueArticle[];
  /** True when this is the issue OJS marks as current. */
  isCurrent: boolean;
};

/** Our slug for the issue OJS currently marks as current. */
export async function getCurrentIssueSlug(): Promise<string | undefined> {
  try {
    const issue = await getCurrentIssue();
    return issue ? issueSlug(issue) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * One published volume. "New issue" is not a separate record — it is simply the
 * latest published volume, so the same builder serves /issues and the archive,
 * and only the kicker differs.
 */
export async function getIssueView(slug: string): Promise<IssueView | undefined> {
  const found = await getIssueBySlug(slug);
  if (!found) return undefined;

  const { issue, identification, articles } = found;
  const [p1, p2] = twoParagraphs(localize(issue.description));
  const isCurrent = (await getCurrentIssueSlug()) === slug;
  const issn = issnLines(await getJournalIssn());

  return {
    identifier: identification,
    articles,
    isCurrent,
    hero: {
      breadcrumb: [
        { label: "Homepage", href: "/" },
        { label: "Archive", href: "/archive" },
        { label: identification, href: isCurrent ? "/issues" : `/archive/${slug}` },
      ],
      kicker: isCurrent ? "NEW ISSUE" : "ARCHIVED",
      doi: doiUrl(issue.doiObject),
      volumeTitle: identification,
      publishMonth: formatDate(issue.datePublished),
      description: journal.issueDescription,
      cover: issueCover(issue),
      coverAlt: `${journal.title} Volume ${issue.volume} Number ${issue.number} cover`,
      issnOnline: issn.online,
      issnPrint: issn.print,
      file: issueFile(issue),
      downloadLabel: journal.downloadLabel,
      previewLabel: journal.previewLabel,
      publishedOn: `Published: ${formatDate(issue.datePublished)}`,
      heading: identification,
      p1: p1 || journal.issueDescription,
      p2,
      facts: [
        { title: `${articles.length} Articles`, text: journal.articlesFactText },
        journal.openAccessFact,
      ],
    },
  };
}

/** The statistics API's consecutive `YYYY-MM` months, labelled for the chart. */
function toMonthlyDownloads(timeline: TimelinePoint[]): MonthlyDownloads[] {
  const [year, month] = (timeline.at(-1)?.date ?? "").split("-").map(Number);
  if (!year || !month) return [];
  return monthlySeries(
    { year, month },
    timeline.map((point) => point.value),
  );
}

/**
 * An article page built from OJS. Sections the journal has not filled in yet
 * (abstract, keywords, references, download stats) come back empty so the page
 * can leave them out rather than showing a hollow heading.
 */
export async function getArticleDetail(slug: string): Promise<ArticleDetail | undefined> {
  try {
    const issues = await getIssues();

    for (const summary of issues) {
      const issue = (await getIssue(summary.id)) ?? summary;

      for (const raw of issue.articles ?? []) {
        const article = toIssueArticle(issue, raw);
        if (article.slug !== slug) continue;

        const view = articleView(raw);
        const identification = localize(issue.identification);

        // The table of contents ships a summary only; abstract, keywords,
        // citations and affiliations need the full publication record.
        const [full, timeline] = await Promise.all([
          view.publication?.id ? getPublication(raw.id, view.publication.id) : undefined,
          getDownloadTimeline(raw.id),
        ]);
        const publication = full ?? view.publication;

        return {
          article: {
            ...article,
            authors: toAuthors(publication?.authors, article.authors[0]?.name ?? ""),
            pages: publication?.pages ?? article.pages,
          },
          breadcrumb: [
            { label: "Homepage", href: "/" },
            { label: "Archive", href: "/archive" },
            { label: identification, href: `/archive/${issueSlug(issue)}` },
            { label: article.tag, href: article.href },
          ],
          doi: doiUrl(publication?.doiObject),
          keywords: toKeywords(publication?.keywords),
          abstract: toAbstract(localize(publication?.abstract)),
          references: (publication?.citations ?? [])
            .map((citation) => ({
              text: firstParagraph(
                typeof citation === "string" ? citation : (citation.rawCitation ?? ""),
                600,
              ),
            }))
            .filter((reference) => reference.text),
          downloads: toMonthlyDownloads(timeline),
          issue: {
            volume: issue.volume ?? 0,
            number: Number(issue.number ?? 0),
            identifier: identification,
            citation: identification,
            year: issue.year ?? new Date().getFullYear(),
            publishedOn: formatDate(issue.datePublished),
            href: `/archive/${issueSlug(issue)}`,
            cover: issueCover(issue),
            coverAlt: `${journal.title} ${identification} cover`,
          },
          copyright: {
            notice: `Copyright (c) ${issue.year ?? ""}`.trim(),
            holder: journal.title,
          },
        };
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/** The latest published volume — what the site calls the "new issue". */
export async function getCurrentIssueView(): Promise<IssueView | undefined> {
  const slug = await getCurrentIssueSlug();
  return slug ? getIssueView(slug) : undefined;
}
