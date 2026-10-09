"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type FormEvent } from "react";
import { CaretDown, UserCircle } from "@/components/icons";
import { dropdownItem } from "@/components/landing/styles";
import { ojsLinks } from "@/lib/links";
import {
  forgetOjsSession,
  refreshOjsSession,
  type OjsUser,
  type SignedInSession,
} from "./useOjsSession";

export type AccountLabels = {
  menu: string;
  dashboard: string;
  profile: string;
  logout: string;
};

const mobileLinkClass =
  "block w-full rounded-lg px-3 py-[9px] text-left font-semibold transition-[color,background-color,transform] duration-300 hover:bg-[#eff4f7] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:translate-x-1";

function Avatar({ user, size }: { user: OjsUser; size: "sm" | "lg" }) {
  const box = size === "sm" ? "size-8 text-xs" : "size-10 text-sm";

  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt=""
        width={40}
        height={40}
        // Per-user and replaced in place by OJS, so never long-cache an optimised copy.
        unoptimized
        className={`${box} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${box} grid shrink-0 place-items-center rounded-full bg-[#07868f] font-semibold text-white`}
    >
      {user.initials || <UserCircle />}
    </span>
  );
}

/** Name and groups, as at the top of the OJS dashboard's user menu. */
function Identity({ session }: { session: SignedInSession }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar user={session.user} size="lg" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#0c0c0c]">{session.user.fullName}</p>
        {session.roles.length > 0 && (
          <p className="truncate text-xs text-slate">{session.roles.join(", ")}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Posts to the OJS plugin, which signs out and redirects back to this page. The
 * token is refreshed first because the cached one may predate a newer login.
 */
function SignOutForm({ session, label, className }: { session: SignedInSession; label: string; className: string }) {
  const tokenRef = useRef<HTMLInputElement>(null);
  const returnToRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const fresh = await refreshOjsSession();
    // Already signed out elsewhere: the header has switched to Login by now.
    if (fresh.status !== "signedIn" || !tokenRef.current || !returnToRef.current) return;

    tokenRef.current.value = fresh.csrfToken;
    returnToRef.current.value = window.location.href;
    forgetOjsSession();
    form.submit();
  };

  return (
    <form method="post" action={ojsLinks.signOut} onSubmit={onSubmit}>
      <input ref={tokenRef} type="hidden" name="csrfToken" defaultValue={session.csrfToken} />
      <input ref={returnToRef} type="hidden" name="returnTo" defaultValue="" />
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}

/**
 * Desktop account menu: an avatar button that opens a panel with the user's name,
 * a link to their OJS dashboard and profile, and Logout. `open` is owned by the
 * header so opening it closes the nav dropdowns and vice versa.
 */
export function UserMenu({
  session,
  labels,
  open,
  onOpenChange,
}: {
  session: SignedInSession;
  labels: AccountLabels;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // A click anywhere outside the menu closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, onOpenChange]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${labels.menu}: ${session.user.fullName}`}
        onClick={() => onOpenChange(!open)}
        className={`flex items-center gap-1.5 rounded-full p-0.5 pr-1.5 transition-colors duration-200 hover:bg-[#eef3f5] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 ${
          open ? "bg-[#eef3f5] text-[#07868f]" : "text-[#0c0c0c]"
        }`}
      >
        <Avatar user={session.user} size="sm" />
        <CaretDown open={open} />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute top-full right-0 z-50 mt-2 grid w-72 gap-0.5 rounded-lg border border-[#dfe5e8] bg-white p-2 shadow-[0_18px_35px_-20px_rgb(0_0_0/0.28)] motion-safe:animate-menu-enter"
        >
          <div className="mb-1 border-b border-[#dfe5e8] px-3 pt-1 pb-3">
            <Identity session={session} />
          </div>
          {session.links.dashboard && (
            <a href={session.links.dashboard} className={dropdownItem}>
              {labels.dashboard}
            </a>
          )}
          <a href={session.links.profile} className={dropdownItem}>
            {labels.profile}
          </a>
          <SignOutForm
            session={session}
            label={labels.logout}
            className={`${dropdownItem} w-full text-left`}
          />
        </div>
      )}
    </div>
  );
}

/** The same account links laid out for the mobile drawer. */
export function MobileUserMenu({
  session,
  labels,
}: {
  session: SignedInSession;
  labels: AccountLabels;
}) {
  return (
    <div className="mt-3 grid gap-1 border-t border-[#d5e0e2] pt-4">
      <div className="px-3 pb-2">
        <Identity session={session} />
      </div>
      {session.links.dashboard && (
        <a href={session.links.dashboard} className={mobileLinkClass}>
          {labels.dashboard}
        </a>
      )}
      <a href={session.links.profile} className={mobileLinkClass}>
        {labels.profile}
      </a>
      <SignOutForm session={session} label={labels.logout} className={mobileLinkClass} />
    </div>
  );
}
