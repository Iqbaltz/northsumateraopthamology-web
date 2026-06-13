import "server-only";
import { OJS_JOURNAL_PATH, USE_FIXTURES } from "../config";
import { ojsFetch } from "./client";
import { fixtureContext, fixtureIssue, fixtureIssues } from "./fixtures";
import type { Article, Context, Issue, ListResponse, Publication } from "./types";

/**
 * Data access for the journal frontend. Each call uses bundled fixtures until an
 * API token is configured (see config.ts: USE_FIXTURES), then hits the live,
 * token-authed OJS REST API. On a live failure we degrade gracefully rather than
 * crashing the page.
 */

export async function getContext(): Promise<Context> {
  if (USE_FIXTURES) return fixtureContext;
  try {
    // This OJS build has no `contexts/current` route; fetch the list and match
    // our journal by its url path.
    const data = await ojsFetch<ListResponse<Context>>("contexts", {
      searchParams: { count: 100 },
    });
    const context = data.items?.find((c) => c.urlPath === OJS_JOURNAL_PATH);
    return context ?? fixtureContext;
  } catch {
    return fixtureContext;
  }
}

export async function getIssues(): Promise<Issue[]> {
  if (USE_FIXTURES) return fixtureIssues;
  try {
    const data = await ojsFetch<ListResponse<Issue>>("issues", {
      searchParams: { count: 50, orderBy: "datePublished", orderDirection: "DESC" },
    });
    return data.items ?? [];
  } catch {
    return fixtureIssues;
  }
}

export async function getIssue(id: number): Promise<Issue | undefined> {
  if (USE_FIXTURES) return fixtureIssue(id);
  try {
    return await ojsFetch<Issue>(`issues/${id}`);
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

export type { Article, Context, Issue, Publication } from "./types";
