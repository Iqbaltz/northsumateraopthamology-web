/** Where a new account lands while OJS waits for its email address to be confirmed. */
export const CHECK_EMAIL_PATH = "/register/check-email";

/**
 * Carries the address the confirmation went to from the register action to the
 * check-email page, so it stays out of the URL (and browser history). Scoped to
 * that page and short-lived.
 */
export const REGISTERED_EMAIL_COOKIE = "jonson_registered_email";
export const REGISTERED_EMAIL_MAX_AGE = 60 * 60;

/**
 * Where the link in the confirmation email opens: the jonsonSession OJS plugin
 * redirects OJS's own activation link here (`JonsonSessionPlugin::ACTIVATE_URL`).
 */
export const ACTIVATE_PATH = "/register/activate";

/** The `id` and `key` an activation link carries; together they activate one account. */
export type ActivationLink = { id: string; key: string };

/**
 * Where an activation link stands: `pending` (ready to activate), `activated`
 * (now or earlier), `expired`, or `invalid` (unknown, mangled or withdrawn).
 */
export type ActivationStatus = "pending" | "activated" | "expired" | "invalid";

export function activationPath(link: ActivationLink) {
  return `${ACTIVATE_PATH}?${new URLSearchParams(link)}`;
}

/** Sign-in page for a just-activated account, which shows a note saying so. */
export const ACTIVATED_LOGIN_PATH = "/login?activated";
