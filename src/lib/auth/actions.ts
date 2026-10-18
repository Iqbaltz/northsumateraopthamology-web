"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import {
  OJS_SESSION_COOKIE_DOMAIN,
  OJS_SESSION_COOKIE_NAME,
  OJS_SESSION_LIFETIME_DAYS,
} from "@/lib/config";
import { register, signIn, type OjsSession } from "@/lib/ojs/auth";
import {
  CHECK_EMAIL_PATH,
  REGISTERED_EMAIL_COOKIE,
  REGISTERED_EMAIL_MAX_AGE,
} from "./registration";

export type AuthFormState = {
  error?: string;
  /** Registration succeeded and the session is handed off; the form takes it from here. */
  registered?: boolean;
  /**
   * What the visitor typed, sent back after a rejected submission so the form
   * can refill itself (React clears it otherwise). Never includes passwords.
   */
  values?: Record<string, string>;
  /** Counts rejected submissions; the form remounts on each, picking up `values`. */
  attempt?: number;
};

/** Every field from the form except the passwords. */
function echoedValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [name, value] of formData) {
    if (typeof value === "string" && !name.startsWith("password") && !name.startsWith("$")) {
      values[name] = value;
    }
  }
  return values;
}

function rejected(previous: AuthFormState, formData: FormData, error: string): AuthFormState {
  return { error, values: echoedValues(formData), attempt: (previous.attempt ?? 0) + 1 };
}

/**
 * Hands the OJS session to the browser scoped to the shared parent domain, so
 * the journal subdomain recognises it on the very next request.
 */
async function handOffSession(session: OjsSession) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: OJS_SESSION_COOKIE_NAME,
    value: session.sessionId,
    // Omitted in development, where no parent domain is shared with OJS.
    ...(OJS_SESSION_COOKIE_DOMAIN ? { domain: OJS_SESSION_COOKIE_DOMAIN } : {}),
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: OJS_SESSION_LIFETIME_DAYS * 24 * 60 * 60,
  });
}

export async function loginAction(
  previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return rejected(previous, formData, "Enter your username and password.");
  }

  const result = await signIn(username, password);
  if (!result.ok) return rejected(previous, formData, result.error);

  await handOffSession(result.session);
  // redirect() throws, so it stays outside any try/catch.
  redirect(result.session.redirectTo);
}

export async function registerAction(
  previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const value = (name: string) => String(formData.get(name) ?? "").trim();

  const password = String(formData.get("password") ?? "");
  const password2 = String(formData.get("password2") ?? "");

  if (password !== password2) {
    return rejected(previous, formData, "The two passwords do not match.");
  }
  if (!formData.get("privacyConsent")) {
    return rejected(previous, formData, "You must agree to the privacy statement to register.");
  }

  const result = await register({
    givenName: value("givenName"),
    familyName: value("familyName"),
    affiliation: value("affiliation"),
    country: value("country"),
    email: value("email"),
    username: value("username"),
    password,
    password2,
    privacyConsent: true,
    emailConsent: Boolean(formData.get("emailConsent")),
  });

  if (!result.ok) return rejected(previous, formData, result.error);
  // OJS keeps the new account disabled until its email link is followed: no session
  // yet, so send the visitor to the page that tells them to check their inbox.
  if ("awaitingVerification" in result) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: REGISTERED_EMAIL_COOKIE,
      value: value("email"),
      path: CHECK_EMAIL_PATH,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: REGISTERED_EMAIL_MAX_AGE,
    });
    // Replace, so Back skips the filled-in form. redirect() throws: keep it out of try/catch.
    redirect(CHECK_EMAIL_PATH, RedirectType.replace);
  }

  await handOffSession(result.session);
  // New accounts go back to this site rather than OJS's "registration complete"
  // page. Returned instead of redirect(): an in-app redirect is a client-side
  // navigation, so the header would keep its signed-out state.
  return { registered: true };
}
