import "server-only";
import { OJS_PUBLIC_URL, OJS_SESSION_COOKIE_NAME } from "../config";

/**
 * Drives the OJS login and registration forms server-side, so the branded forms
 * can live on this domain while OJS stays the single source of identity.
 *
 * OJS has no auth API: both forms are classic POSTs guarded by a session-bound
 * `csrfToken`, so every call first fetches the form to pick up a token plus the
 * session cookie it belongs to, then posts with that pair.
 *
 * The session cookie that comes back is handed to the browser scoped to the
 * shared parent domain — see docs/ojs-login.md for the two OJS-side settings
 * this depends on.
 */

export type OjsSession = {
  /** Value of the OJS session cookie to hand to the browser. */
  sessionId: string;
  /** Where OJS wants the user to land (its own dashboard URL). */
  redirectTo: string;
};

export type AuthResult =
  | { ok: true; session: OjsSession }
  | { ok: false; error: string };

const CSRF_PATTERN = /name="csrfToken"[^>]*value="([^"]+)"/;

/** OJS re-renders the form with this block when it rejects a submission. */
const ERROR_PATTERN = /class="[^"]*(?:pkp_form_error|form__error)[^"]*"[^>]*>([\s\S]{0,300}?)</g;

/**
 * Under that block's heading, OJS lists each problem:
 * `<ul class="pkp_form_error_list"><li><a href="#password">The passwords do not match.</a></li></ul>`.
 */
const ERROR_LIST_PATTERN = /<ul[^>]*class="[^"]*pkp_form_error_list[^"]*"[^>]*>([\s\S]*?)<\/ul>/;

/** The heading above that list; it says nothing about what went wrong. */
const ERROR_HEADING = /^errors occurred processing this form:?$/i;

function stripTags(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The live session id among the response's cookies. OJS responses also clear
 * cookies (the old journal-only one, and the previous session on sign-in), so
 * skip any being deleted and keep the last one set.
 */
function readSessionCookie(response: Response): string | undefined {
  let sessionId: string | undefined;
  for (const cookie of response.headers.getSetCookie()) {
    const match = cookie.match(new RegExp(`^${OJS_SESSION_COOKIE_NAME}=([^;]+)`));
    if (!match || match[1] === "deleted" || /;\s*max-age=0\s*(;|$)/i.test(cookie)) continue;
    sessionId = match[1];
  }
  return sessionId;
}

/** Fetches an OJS form and returns its CSRF token plus the session it belongs to. */
async function openForm(path: string) {
  const response = await fetch(`${OJS_PUBLIC_URL}/${path}`, {
    headers: { Accept: "text/html" },
    cache: "no-store",
  });
  const html = await response.text();
  const csrfToken = html.match(CSRF_PATTERN)?.[1];
  const sessionId = readSessionCookie(response);

  if (!csrfToken || !sessionId) {
    throw new Error(`OJS ${path}: could not read a CSRF token or session cookie`);
  }
  return { csrfToken, sessionId, html };
}

async function postForm(path: string, sessionId: string, body: URLSearchParams) {
  return fetch(`${OJS_PUBLIC_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `${OJS_SESSION_COOKIE_NAME}=${sessionId}`,
      Accept: "text/html",
    },
    body,
    redirect: "manual",
    cache: "no-store",
  });
}

/**
 * A 302 means OJS accepted the submission; a 200 means it re-rendered the form
 * with validation errors.
 */
function firstFormError(html: string, fallback: string) {
  const list = html.match(ERROR_LIST_PATTERN)?.[1] ?? "";
  const listed = [...list.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
  if (listed.length) return listed.join(" ");

  // The login form shows a single message instead of a list.
  const matches = [...html.matchAll(ERROR_PATTERN)]
    .map((match) => stripTags(match[1]))
    .filter((message) => message && !ERROR_HEADING.test(message));
  return matches[0] || fallback;
}

export async function signIn(username: string, password: string): Promise<AuthResult> {
  let form;
  try {
    form = await openForm("login");
  } catch {
    return { ok: false, error: "The journal is not reachable right now. Please try again shortly." };
  }

  const response = await postForm(
    "login/signIn",
    form.sessionId,
    new URLSearchParams({
      csrfToken: form.csrfToken,
      source: "",
      username,
      password,
    }),
  );

  if (response.status !== 302) {
    const html = await response.text();
    return { ok: false, error: firstFormError(html, "Invalid username or password.") };
  }

  // OJS regenerates the session id on a successful sign-in; fall back to the
  // pre-login id only if it chose not to reissue one.
  const sessionId = readSessionCookie(response) ?? form.sessionId;
  const redirectTo = response.headers.get("location") ?? `${OJS_PUBLIC_URL}/submissions`;

  return { ok: true, session: { sessionId, redirectTo } };
}

export type RegistrationFields = {
  givenName: string;
  familyName: string;
  affiliation: string;
  country: string;
  email: string;
  username: string;
  password: string;
  password2: string;
  privacyConsent: boolean;
  emailConsent: boolean;
};

/**
 * With email verification on (OJS `require_validation`), OJS creates the account
 * disabled, signs no one in, and answers with a "Registration awaiting
 * verification" message page instead of redirecting.
 */
export type RegisterResult = AuthResult | { ok: true; awaitingVerification: true };

export async function register(fields: RegistrationFields): Promise<RegisterResult> {
  let form;
  try {
    form = await openForm("user/register");
  } catch {
    return { ok: false, error: "The journal is not reachable right now. Please try again shortly." };
  }

  const body = new URLSearchParams({
    csrfToken: form.csrfToken,
    givenName: fields.givenName,
    familyName: fields.familyName,
    affiliation: fields.affiliation,
    country: fields.country,
    email: fields.email,
    username: fields.username,
    password: fields.password,
    password2: fields.password2,
  });
  if (fields.privacyConsent) body.set("privacyConsent", "1");
  if (fields.emailConsent) body.set("emailConsent", "1");

  const response = await postForm("user/register", form.sessionId, body);

  if (response.status !== 302) {
    const html = await response.text();
    // The form is gone and a message page took its place: the account exists and
    // waits for its email link.
    if (!html.includes('id="register"') && html.includes("page_message")) {
      return { ok: true, awaitingVerification: true };
    }
    return {
      ok: false,
      error: firstFormError(html, "Registration could not be completed. Please check your details."),
    };
  }

  const sessionId = readSessionCookie(response) ?? form.sessionId;
  const redirectTo = response.headers.get("location") ?? `${OJS_PUBLIC_URL}/submissions`;

  return { ok: true, session: { sessionId, redirectTo } };
}

/** Country options scraped from the OJS form, so the list always matches OJS. */
export async function countryOptions(): Promise<{ value: string; label: string }[]> {
  try {
    const response = await fetch(`${OJS_PUBLIC_URL}/user/register`, {
      headers: { Accept: "text/html" },
      next: { revalidate: 86400 },
    });
    const html = await response.text();
    const select = html.match(/<select[^>]*name="country"[\s\S]*?<\/select>/)?.[0] ?? "";
    return [...select.matchAll(/<option value="([A-Z]{2})"[^>]*>([^<]+)</g)].map((match) => ({
      value: match[1],
      label: stripTags(match[2]),
    }));
  } catch {
    return [];
  }
}
