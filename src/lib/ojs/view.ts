import "server-only";
import type { VolumeCatalogItem } from "@/components/VolumeCard";
import type { ArticlePreview } from "@/components/landing/content";
import {
  articlePath,
  articleSlug,
  issueDoiUrl,
  journal,
  type ArticleAuthor,
  type IssueArticle,
} from "@/components/issues/journal";
import { formatDate } from "../format";
import { ojsLinks } from "../links";
import { articleView, sectionTitle } from "./article";
import { getCurrentIssue, getIssue, getIssues, getPublication } from "./index";
import { localize } from "./localize";
import type { AbstractPart, ArticleDetail } from "@/components/article/content";
import type { IssueHero } from "@/components/issues/IssueSections";
import type { Issue, Publication } from "./types";

/**
 * Maps published OJS content onto the landing page's view shapes.
 *
 * Every function degrades to an empty result rather than throwing, so the page
 * can fall back to its designed placeholder content whenever the journal has
 * nothing published yet or the API is unreachable.
 */

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
    // OJS has no per-article artwork; the issue cover stands in.
    image: issueCover(issue),
    alt: `Cover of ${localize(issue.identification) || journal.title}`,
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
    if (!issue?.published || !issue.articles?.length) return [];

    return issue.articles.slice(0, limit).map((article) => toPreview(issue, article));
  } catch {
    return [];
  }
}

export type CurrentIssueSummary = {
  /** "VOLUME 1\nNUMBER 1" — the two-line heading the issue card shows. */
  volumeTitle: string;
  publishMonth: string;
  description: string;
  identification: string;
  href: string;
  articleCount: number;
  cover: string;
  coverAlt: string;
};

/** Headline facts about the issue OJS currently marks as current. */
export async function getCurrentIssueSummary(): Promise<CurrentIssueSummary | undefined> {
  try {
    const issue = await getCurrentIssue();
    if (!issue?.published) return undefined;

    const volume = issue.volume ? `VOLUME ${issue.volume}` : "";
    const number = issue.number ? `NUMBER ${issue.number}` : "";

    return {
      volumeTitle: [volume, number].filter(Boolean).join("\n") || localize(issue.identification),
      publishMonth: formatDate(issue.datePublished),
      // Full text; the card clamps it to five lines.
      description: plainText(localize(issue.description)) || journal.issueDescription,
      identification: localize(issue.identification),
      href: ojsLinks.issue(issue.id),
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
    label: `VOLUME ${issue.volume} • NUMBER ${issue.number}`,
    published: `Published ${formatDate(issue.datePublished)}`,
    href: `/archive/${issueSlug(issue)}`,
    articleCount,
  };
}

/** Published volumes, newest first. Empty when the journal has none. */
export async function getVolumeCards(limit?: number): Promise<VolumeCatalogItem[]> {
  try {
    const issues = (await getIssues()).filter((issue) => issue.published);
    const wanted = limit ? issues.slice(0, limit) : issues;

    // The issue list omits the table of contents, so each issue is hydrated to
    // count its articles. Responses are cached, so this costs one round trip
    // per issue per revalidation window.
    return Promise.all(
      wanted.map(async (summary) => {
        const issue = (await getIssue(summary.id)) ?? summary;
        return toVolumeCard(issue, issue.articles?.length);
      }),
    );
  } catch {
    return [];
  }
}

/** Slugs for every published volume, for `generateStaticParams`. */
export async function getVolumeSlugs(): Promise<string[]> {
  try {
    return (await getIssues()).filter((i) => i.published).map(issueSlug);
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
    downloadHref: galley
      ? ojsLinks.galleyDownload(article.id, galley.id)
      : ojsLinks.article(article.id),
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
    const match = (await getIssues()).find((i) => i.published && issueSlug(i) === slug);
    if (!match) return undefined;

    // The list omits the table of contents; hydrate it.
    const issue = (await getIssue(match.id)) ?? match;
    return {
      issue,
      identification: localize(issue.identification),
      articles: (issue.articles ?? []).map((article) => toIssueArticle(issue, article)),
    };
  } catch {
    return undefined;
  }
}

/** Every published article across every volume, for article pages. */
export async function getAllArticles(): Promise<IssueArticle[]> {
  try {
    const issues = (await getIssues()).filter((i) => i.published);
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
    return issue?.published ? issueSlug(issue) : undefined;
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
      doi: issue.volume && issue.number
        ? issueDoiUrl(issue.volume, Number(issue.number))
        : undefined,
      volumeTitle: `VOLUME ${issue.volume}\nNUMBER ${issue.number}`,
      publishMonth: formatDate(issue.datePublished),
      description: journal.issueDescription,
      cover: issueCover(issue),
      coverAlt: `${journal.title} Volume ${issue.volume} Number ${issue.number} cover`,
      issnOnline: journal.issnOnline,
      issnPrint: journal.issnPrint,
      downloadLabel: journal.downloadLabel,
      publishedOn: `Published: ${formatDate(issue.datePublished)}`,
      heading: `VOLUME ${issue.volume} – NUMBER ${issue.number}`,
      p1: p1 || journal.issueDescription,
      p2,
      facts: [
        { title: `${articles.length} Articles`, text: journal.articlesFactText },
        journal.openAccessFact,
      ],
    },
  };
}

/**
 * An article page built from OJS. Sections the journal has not filled in yet
 * (abstract, keywords, references, download stats) come back empty so the page
 * can leave them out rather than showing a hollow heading.
 */
export async function getArticleDetail(slug: string): Promise<ArticleDetail | undefined> {
  try {
    const issues = (await getIssues()).filter((i) => i.published);

    for (const summary of issues) {
      const issue = (await getIssue(summary.id)) ?? summary;

      for (const raw of issue.articles ?? []) {
        const article = toIssueArticle(issue, raw);
        if (article.slug !== slug) continue;

        const view = articleView(raw);
        const identification = localize(issue.identification);

        // The table of contents ships a summary only; abstract, keywords,
        // citations and affiliations need the full publication record.
        const full = view.publication?.id
          ? await getPublication(raw.id, view.publication.id)
          : undefined;
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
          doi: publication?.doiObject?.doi ? `https://doi.org/${publication.doiObject.doi}` : "",
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
          // OJS keeps usage stats behind a separate statistics API.
          downloads: [],
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
