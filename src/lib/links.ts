/**
 * Deep links into the existing OJS server. These hand the reader off to OJS for
 * anything it renders server-side: full-text galleys/PDF, auth, submissions.
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

  issue: (issueId: number) => `${OJS_PUBLIC_URL}/issue/view/${issueId}`,

  /** The issue OJS currently marks as current, whatever its id. */
  currentIssue: `${OJS_PUBLIC_URL}/issue/current`,
  /** OJS's own archive listing. */
  archive: `${OJS_PUBLIC_URL}/issue/archive`,
  announcements: `${OJS_PUBLIC_URL}/announcement`,

  login: `${OJS_PUBLIC_URL}/login`,
  /** OJS asks for the account's email and sends a password reset link. */
  lostPassword: `${OJS_PUBLIC_URL}/login/lostPassword`,
  register: `${OJS_PUBLIC_URL}/user/register`,

  /**
   * Who is signed in, as JSON. Served by the jonsonSession OJS plugin
   * (ojs-plugins/jonsonSession) and readable only from this site's domain.
   */
  whoami: `${OJS_PUBLIC_URL}/whoami`,
  /** POST target (same plugin) that signs out, then redirects to `returnTo` on this site. */
  signOut: `${OJS_PUBLIC_URL}/whoami/signOut`,

  submit: `${OJS_PUBLIC_URL}/about/submissions`,
  /** Starts a new submission (OJS 3.5 wizard); signed-out visitors are sent to login first. */
  newSubmission: `${OJS_PUBLIC_URL}/submission`,
  about: `${OJS_PUBLIC_URL}/about`,
  /** OJS 3.5 renamed the editorial team page to the masthead; the old path 404s. */
  editorialMasthead: `${OJS_PUBLIC_URL}/about/editorialMasthead`,
  privacy: `${OJS_PUBLIC_URL}/about/privacy`,
  contact: `${OJS_PUBLIC_URL}/about/contact`,
} as const;

/**
 * Galley files served from this site: `app/files` streams them from OJS, so
 * readers never leave for the journal subdomain. They open in the browser's
 * viewer; `download` saves the file instead.
 */
export const fileLinks = {
  article: (submissionId: number, galleyId: number | string, download = false) =>
    `/files/article/${submissionId}/${galleyId}${download ? "?download" : ""}`,

  issue: (issueId: number, galleyId: number | string, download = false) =>
    `/files/issue/${issueId}/${galleyId}${download ? "?download" : ""}`,
} as const;
