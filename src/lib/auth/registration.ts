/** Where a new account lands while OJS waits for its email address to be confirmed. */
export const CHECK_EMAIL_PATH = "/register/check-email";

/**
 * Carries the address the confirmation went to from the register action to the
 * check-email page, so it stays out of the URL (and browser history). Scoped to
 * that page and short-lived.
 */
export const REGISTERED_EMAIL_COOKIE = "jonson_registered_email";
export const REGISTERED_EMAIL_MAX_AGE = 60 * 60;
