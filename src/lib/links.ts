/**
 * Deep links into the existing OJS server. These hand the reader off to OJS for
 * anything it renders server-side: full-text galleys/PDF, search, auth, submissions.
 * Safe to use from both server and client components (NEXT_PUBLIC_ value).
 */
import { OJS_PUBLIC_URL } from "./config";

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

  search: (query?: string) =>
    query
      ? `${OJS_PUBLIC_URL}/search/search?query=${encodeURIComponent(query)}`
      : `${OJS_PUBLIC_URL}/search`,

  login: `${OJS_PUBLIC_URL}/login`,
  register: `${OJS_PUBLIC_URL}/user/register`,
  submit: `${OJS_PUBLIC_URL}/about/submissions`,
  about: `${OJS_PUBLIC_URL}/about`,
  editorialTeam: `${OJS_PUBLIC_URL}/about/editorialTeam`,
  contact: `${OJS_PUBLIC_URL}/about/contact`,
} as const;
