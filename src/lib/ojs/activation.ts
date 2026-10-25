import "server-only";
import type { ActivationLink, ActivationStatus } from "@/lib/auth/registration";
import { OJS_PUBLIC_URL } from "../config";

/**
 * Activates new accounts through the jonsonSession OJS plugin
 * (`{journal}/whoami/activation`), so the link in the confirmation email can open
 * on this site instead of OJS's own confirmation page.
 */

const STATUSES: readonly string[] = ["pending", "activated", "expired", "invalid"];

const ENDPOINT = `${OJS_PUBLIC_URL}/whoami/activation`;

/** The plugin's answer; null when OJS could not be reached or answered with an error. */
async function ask(url: string, init: RequestInit = {}): Promise<ActivationStatus | null> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const { status } = (await response.json()) as { status?: unknown };
    return typeof status === "string" && STATUSES.includes(status)
      ? (status as ActivationStatus)
      : null;
  } catch {
    return null;
  }
}

/** Looks the link up without using it. */
export function activationStatus(link: ActivationLink) {
  return ask(`${ENDPOINT}?${new URLSearchParams(link)}`);
}

/** Activates the account if the link is still pending, then reports where it stands. */
export function activateAccount(link: ActivationLink) {
  return ask(ENDPOINT, { method: "POST", body: new URLSearchParams(link) });
}
