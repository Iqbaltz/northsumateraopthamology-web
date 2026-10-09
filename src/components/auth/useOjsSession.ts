"use client";

import { useSyncExternalStore } from "react";
import { ojsLinks } from "@/lib/links";

/**
 * Who is signed in to OJS, as seen from this site's header.
 *
 * The browser asks the jonsonSession plugin on the journal host directly. Both
 * hosts share a parent domain, so the OJS session cookie travels with the
 * request; pages stay static because nothing user-specific is rendered on the
 * server.
 */

export type OjsUser = {
  fullName: string;
  initials: string;
  /** Profile picture uploaded in OJS, if any. */
  avatarUrl: string | null;
};

export type SignedInSession = {
  status: "signedIn";
  user: OjsUser;
  /** The user's groups in the journal, e.g. "Journal editor". */
  roles: string[];
  links: {
    /** The dashboard OJS sends this user to after login; null for readers. */
    dashboard: string | null;
    profile: string;
  };
  /** Session CSRF token that `ojsLinks.signOut` requires. */
  csrfToken: string;
};

export type OjsSession = { status: "loading" } | { status: "anonymous" } | SignedInSession;

/** Body of `whoami` — see ojs-plugins/jonsonSession/JonsonSessionHandler.php. */
type WhoamiPayload = {
  loggedIn?: boolean;
  user?: Partial<OjsUser>;
  roles?: unknown[];
  links?: { dashboard?: string | null; profile?: string };
  csrfToken?: string;
};

const LOADING: OjsSession = { status: "loading" };
const ANONYMOUS: OjsSession = { status: "anonymous" };
const SIGNED_OUT: WhoamiPayload = { loggedIn: false };

/** Last answer, so a full page load paints the right header before the check returns. */
const CACHE_KEY = "jonson:ojs-session";

/** Anything other than a well-formed signed-in answer reads as signed out. */
function parseWhoami(payload: unknown): OjsSession {
  const data = (payload ?? {}) as WhoamiPayload;
  if (
    data.loggedIn !== true ||
    typeof data.user?.fullName !== "string" ||
    typeof data.links?.profile !== "string" ||
    typeof data.csrfToken !== "string"
  ) {
    return ANONYMOUS;
  }

  return {
    status: "signedIn",
    user: {
      fullName: data.user.fullName,
      initials: data.user.initials ?? "",
      avatarUrl: data.user.avatarUrl ?? null,
    },
    roles: (data.roles ?? []).filter((role): role is string => typeof role === "string"),
    links: { dashboard: data.links.dashboard ?? null, profile: data.links.profile },
    csrfToken: data.csrfToken,
  };
}

function readCache(): OjsSession | undefined {
  try {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    return cached ? parseWhoami(JSON.parse(cached)) : undefined;
  } catch {
    return undefined;
  }
}

function writeCache(payload: unknown) {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable (private mode, blocked site data): just skip the cache.
  }
}

let snapshot: OjsSession = LOADING;
let inFlight: Promise<OjsSession> | undefined;
const listeners = new Set<() => void>();

function publish(payload: unknown) {
  snapshot = parseWhoami(payload);
  writeCache(payload);
  listeners.forEach((listener) => listener());
}

/** Asks OJS who is signed in. Concurrent callers share one request. */
export function refreshOjsSession(): Promise<OjsSession> {
  inFlight ??= fetch(ojsLinks.whoami, { credentials: "include", cache: "no-store" })
    .then((response) => (response.ok ? response.json() : SIGNED_OUT))
    // OJS unreachable: fall back to the Login button rather than a broken menu.
    .catch(() => SIGNED_OUT)
    .then((payload) => {
      publish(payload);
      return snapshot;
    })
    .finally(() => {
      inFlight = undefined;
    });
  return inFlight;
}

/**
 * Drops the cached answer without re-rendering, for when the page is about to
 * navigate away to sign out — the next page then starts signed out.
 */
export function forgetOjsSession() {
  writeCache(SIGNED_OUT);
}

/** Signing in or out in an OJS tab is picked up when the visitor comes back. */
function onVisibilityChange() {
  if (document.visibilityState === "visible") void refreshOjsSession();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    if (snapshot.status === "loading") {
      snapshot = readCache() ?? LOADING;
      listener();
    }
    // Always revalidate: the cache only spares a flash of the wrong header.
    void refreshOjsSession();
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => LOADING;

export function useOjsSession(): OjsSession {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
