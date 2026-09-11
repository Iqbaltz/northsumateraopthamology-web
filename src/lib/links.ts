/**
 * Deep links into the existing OJS server. These hand the reader off to OJS for
 * anything it renders server-side: full-text galleys/PDF, search, auth, submissions.
 * Safe to use from both server and client components (NEXT_PUBLIC_ value).
 */
import { OJS_PUBLIC_URL } from "./config";

/** Advanced search fields OJS accepts on `search/search` (verified against the live form). */
export type JournalSearchQuery = {
  query?: string;
  authors?: string;
  /** ISO `yyyy-mm-dd`, as produced by a native date input. */
  publishedAfter?: string;
  publishedBefore?: string;
};

/**
 * OJS takes each bound as three separate values rather than one date, so an ISO
 * date is split into the `dateFromYear`/`Month`/`Day` trio it expects.
 */
function appendDateParts(
  params: URLSearchParams,
  prefix: "dateFrom" | "dateTo",
  isoDate?: string,
) {
  if (!isoDate) return;
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return;
  params.set(`${prefix}Year`, year);
  params.set(`${prefix}Month`, String(Number(month)));
  params.set(`${prefix}Day`, String(Number(day)));
}

/** Names of the three hidden inputs a date bound expands into. */
export function dateFieldNames(prefix: "dateFrom" | "dateTo") {
  return [`${prefix}Year`, `${prefix}Month`, `${prefix}Day`] as const;
}

/** Splits an ISO date into the [year, month, day] values OJS expects, if set. */
export function dateFieldValues(isoDate: string): [string, string, string] | undefined {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return undefined;
  return [year, String(Number(month)), String(Number(day))];
}

export const ojsLinks = {
  /** Article landing page on OJS (abstract + reading tools). */
  article: (submissionId: number) =>
    `${OJS_PUBLIC_URL}/article/view/${submissionId}`,

  /** Galley viewer (PDF.js / HTML galley). */
  galley: (submissionId: number, galleyId: number | string) =>
    `${OJS_PUBLIC_URL}/article/view/${submissionId}/${galleyId}`,

  /** Direct galley download. */
  galleyDownload: (submissionId: number, galleyId: number | string) =>
    `${OJS_PUBLIC_URL}/article/download/${submissionId}/${galleyId}`,

  issue: (issueId: number) => `${OJS_PUBLIC_URL}/issue/view/${issueId}`,

  /** GET target of the OJS search form — post the fields in `journalSearchFields`. */
  searchAction: `${OJS_PUBLIC_URL}/search/search`,

  search: (params: JournalSearchQuery | string = {}) => {
    const query = typeof params === "string" ? { query: params } : params;
    const search = new URLSearchParams();

    if (query.query) search.set("query", query.query);
    if (query.authors) search.set("authors", query.authors);
    appendDateParts(search, "dateFrom", query.publishedAfter);
    appendDateParts(search, "dateTo", query.publishedBefore);

    const queryString = search.toString();
    return queryString
      ? `${OJS_PUBLIC_URL}/search/search?${queryString}`
      : `${OJS_PUBLIC_URL}/search`;
  },

  login: `${OJS_PUBLIC_URL}/login`,
  register: `${OJS_PUBLIC_URL}/user/register`,
  submit: `${OJS_PUBLIC_URL}/about/submissions`,
  about: `${OJS_PUBLIC_URL}/about`,
  editorialTeam: `${OJS_PUBLIC_URL}/about/editorialTeam`,
  contact: `${OJS_PUBLIC_URL}/about/contact`,
} as const;
