import "server-only";
import { OJS_JOURNAL_PATH, USE_FIXTURES } from "../config";
import { currentPublication } from "./article";
import { ojsFetch } from "./client";
import { fixtureContext, fixtureIssue, fixtureIssues } from "./fixtures";
import type { Article, Context, Issue, ListResponse, Publication } from "./types";

/**
 * Data access for the journal frontend. Each call uses bundled fixtures until an
 * API token is configured (see config.ts: USE_FIXTURES), then hits the live,
 * token-authed OJS REST API. On a live failure we degrade gracefully rather than
 * crashing the page.
 *
 * The token belongs to an editor, so OJS hands back unpublished work too. Only
 * published issues and articles leave this module; deleted ones simply stop
 * coming back from the API.
 */

/** OJS status of a published submission or publication (`STATUS_PUBLISHED`). */
const STATUS_PUBLISHED = 3;

function isPublishedArticle(article: Article): boolean {
  return (
    article.status === STATUS_PUBLISHED &&
    currentPublication(article)?.status === STATUS_PUBLISHED
  );
}

/**
 * An issue's table of contents lists every submission assigned to it, which
 * still includes an article unpublished after the issue went out.
 */
function withPublishedArticles(issue: Issue): Issue {
  return issue.articles ? { ...issue, articles: issue.articles.filter(isPublishedArticle) } : issue;
}

export async function getContext(): Promise<Context> {
  if (USE_FIXTURES) return fixtureContext;
  try {
    // This OJS build has no `contexts/current` route; fetch the list and match
    // our journal by its url path.
    const data = await ojsFetch<ListResponse<Context>>("contexts", {
      searchParams: { count: 100 },
    });
    const listed = data.items?.find((c) => c.urlPath === OJS_JOURNAL_PATH);
    if (!listed) return fixtureContext;
    // The list is a summary; settings such as the ISSNs only come with the full record.
    return await ojsFetch<Context>(`contexts/${listed.id}`);
  } catch {
    return fixtureContext;
  }
}

/** OJS caps a list response at 100 items. */
const ISSUES_PER_REQUEST = 100;

/** Every published issue, newest first. Walks the API's pages so the archive can list them all. */
export async function getIssues(): Promise<Issue[]> {
  if (USE_FIXTURES) return fixtureIssues;
  try {
    const issues: Issue[] = [];
    for (;;) {
      const data = await ojsFetch<ListResponse<Issue>>("issues", {
        searchParams: {
          // OJS reads 1/0 here; "true"/"false" are silently ignored.
          isPublished: 1,
          count: ISSUES_PER_REQUEST,
          offset: issues.length,
          orderBy: "datePublished",
          orderDirection: "DESC",
        },
      });
      const items = data.items ?? [];
      issues.push(...items);
      if (!items.length || issues.length >= (data.itemsMax ?? 0)) {
        return issues.filter((issue) => issue.published);
      }
    }
  } catch {
    return fixtureIssues;
  }
}

/** One issue with its table of contents, limited to published articles. */
export async function getIssue(id: number): Promise<Issue | undefined> {
  if (USE_FIXTURES) return fixtureIssue(id);
  try {
    return withPublishedArticles(await ojsFetch<Issue>(`issues/${id}`));
  } catch {
    return fixtureIssue(id);
  }
}

/** The most recently published issue (for the home page). */
export async function getCurrentIssue(): Promise<Issue | undefined> {
  const issues = await getIssues();
  const latest = issues[0];
  if (!latest) return undefined;
  // The issues list omits the table of contents; hydrate it so the home page
  // can show the issue's articles.
  return (await getIssue(latest.id)) ?? latest;
}

/** Locate an article + its issue across published issues (TOC is our source). */
export async function findArticle(
  articleId: number,
): Promise<{ article: Article; publication?: Publication; issue: Issue } | undefined> {
  const issues = await getIssues();
  for (const issue of issues) {
    const hydrated = (await getIssue(issue.id)) ?? issue;
    const article = hydrated.articles?.find((a) => a.id === articleId);
    if (article) {
      const publication =
        article.publications?.find((p) => p.id === article.currentPublicationId) ??
        article.publications?.[0];
      return { article, publication, issue: hydrated };
    }
  }
  return undefined;
}

/** One month of usage from the OJS statistics API, e.g. `{ date: "2025-10", value: 4 }`. */
export type TimelinePoint = { date: string; value: number };

/** Months of download history shown on an article page, ending last month or this one. */
const DOWNLOAD_MONTHS = 12;

/** YYYY-MM-DD in UTC, the form the statistics API takes. */
function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Monthly file downloads (PDF/HTML galleys) for one article over the last year,
 * oldest first with empty months as zero. OJS only allows the statistics API to
 * managers and editors, so the API token must belong to one; without stats this
 * returns [] and the page leaves the chart out.
 */
export async function getDownloadTimeline(submissionId: number): Promise<TimelinePoint[]> {
  if (USE_FIXTURES) return [];
  // Usage logs are processed overnight, and OJS rejects an end date after yesterday.
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - (DOWNLOAD_MONTHS - 1), 1),
  );
  try {
    const timeline = await ojsFetch<TimelinePoint[]>(
      `stats/publications/${submissionId}/timeline`,
      {
        searchParams: {
          type: "files",
          timelineInterval: "month",
          dateStart: isoDate(start),
          dateEnd: isoDate(end),
        },
      },
    );
    return Array.isArray(timeline)
      ? timeline.map(({ date, value }) => ({ date, value: Number(value) || 0 }))
      : [];
  } catch {
    return [];
  }
}

export type { Article, Context, Issue, Publication } from "./types";

/**
 * Full publication record. The issue table of contents returns a trimmed
 * summary — abstract, keywords, citations and author affiliations only come
 * back from this endpoint.
 */
export async function getPublication(
  submissionId: number,
  publicationId: number,
): Promise<Publication | undefined> {
  if (USE_FIXTURES) return undefined;
  try {
    return await ojsFetch<Publication>(
      `submissions/${submissionId}/publications/${publicationId}`,
    );
  } catch {
    return undefined;
  }
}
