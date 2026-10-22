"use client";

import { useActionState } from "react";
import { AuthError } from "@/components/auth/AuthShell";
import { button } from "@/components/landing/styles";
import { activateAction, type AuthFormState } from "@/lib/auth/actions";
import type { ActivationLink } from "@/lib/auth/registration";

const initialState: AuthFormState = {};

/**
 * The Activate Account button. A form rather than a link, so that email
 * security scanners, which open links but never submit forms, can't use it up.
 */
export function ActivateForm({
  link,
  label,
  busyLabel,
}: {
  link: ActivationLink;
  label: string;
  busyLabel: string;
}) {
  const [state, formAction, pending] = useActionState(activateAction, initialState);

  return (
    <form action={formAction} className="max-w-[640px]">
      <input type="hidden" name="id" value={link.id} />
      <input type="hidden" name="key" value={link.key} />
      <AuthError message={state.error} />
      <button type="submit" disabled={pending} className={`${button} uppercase disabled:opacity-60`}>
        {pending ? busyLabel : label}
      </button>
    </form>
  );
}
