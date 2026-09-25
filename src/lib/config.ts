/**
 * Central configuration for the single-journal site (OJS `JONSON`).
 *
 * Server-only values (base URL, journal path, API token) must NOT be read from
 * client components. The only value safe for the browser is the public URL,
 * which is exposed via the NEXT_PUBLIC_ prefix and used purely for deep links.
 */

// --- Server-only (do not import into client components) ---
export const OJS_BASE_URL =
  process.env.OJS_BASE_URL ??
  "https://journal.northsumateraophthalmology.com/index.php";

export const OJS_JOURNAL_PATH = process.env.OJS_JOURNAL_PATH ?? "JONSON";

export const OJS_API_TOKEN = process.env.OJS_API_TOKEN ?? "";

/** Base for the token-authed REST API, e.g. https://host/index.php/JONSON/api/v1 */
export const OJS_API_BASE = `${OJS_BASE_URL}/${OJS_JOURNAL_PATH}/api/v1`;

/** OAI-PMH endpoint (metadata fallback). */
export const OJS_OAI_URL = `${OJS_BASE_URL}/${OJS_JOURNAL_PATH}/oai`;

/**
 * Until a token is configured AND content is published, we render bundled
 * fixtures so the branded UI can be previewed. Set OJS_API_TOKEN (and publish an
 * issue) to switch to live data, or force fixtures with OJS_USE_FIXTURES=1.
 */
export const USE_FIXTURES =
  process.env.OJS_USE_FIXTURES === "1" || OJS_API_TOKEN.length === 0;

// --- Safe for the browser (deep links to the existing OJS server) ---
export const OJS_PUBLIC_URL =
  process.env.NEXT_PUBLIC_OJS_PUBLIC_URL ??
  "https://journal.northsumateraophthalmology.com/index.php/JONSON";

/** Locale used to resolve OJS localized fields when no explicit locale is given. */
export const DEFAULT_LOCALE = process.env.OJS_DEFAULT_LOCALE ?? "en";

/** Default ISR revalidation window (seconds) for API-backed pages. */
export const REVALIDATE_SECONDS = 600;

// --- Session hand-off to OJS (see docs/ojs-login.md) ---

/** Name of the session cookie OJS issues (`session_cookie_name` in config.inc.php). */
export const OJS_SESSION_COOKIE_NAME =
  process.env.OJS_SESSION_COOKIE_NAME ?? "OJSSID";

/**
 * Domain to scope the forwarded session cookie to. Must be a parent of BOTH this
 * site and the OJS host — e.g. ".northsumateraophthalmology.com" covers both
 * `northsumateraophthalmology.com` and `journal.northsumateraophthalmology.com`.
 *
 * Leave empty in local development: a cookie cannot be scoped to a domain the
 * current host isn't part of, so the hand-off only works in production.
 */
export const OJS_SESSION_COOKIE_DOMAIN =
  process.env.OJS_SESSION_COOKIE_DOMAIN ?? "";

/** Days the forwarded session stays valid; mirrors OJS `session_lifetime`. */
export const OJS_SESSION_LIFETIME_DAYS = Number(
  process.env.OJS_SESSION_LIFETIME_DAYS ?? 7,
);
