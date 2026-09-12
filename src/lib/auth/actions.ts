"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  OJS_SESSION_COOKIE_DOMAIN,
  OJS_SESSION_COOKIE_NAME,
  OJS_SESSION_LIFETIME_DAYS,
} from "@/lib/config";
import { register, signIn, type OjsSession } from "@/lib/ojs/auth";

export type AuthFormState = { error?: string };

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
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  const result = await signIn(username, password);
  if (!result.ok) return { error: result.error };

  await handOffSession(result.session);
  // redirect() throws, so it stays outside any try/catch.
  redirect(result.session.redirectTo);
}

export async function registerAction(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const value = (name: string) => String(formData.get(name) ?? "").trim();

  const password = String(formData.get("password") ?? "");
  const password2 = String(formData.get("password2") ?? "");

  if (password !== password2) {
    return { error: "The two passwords do not match." };
  }
  if (!formData.get("privacyConsent")) {
    return { error: "You must agree to the privacy statement to register." };
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

  if (!result.ok) return { error: result.error };

  await handOffSession(result.session);
  redirect(result.session.redirectTo);
}
