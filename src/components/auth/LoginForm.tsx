"use client";

import { useActionState } from "react";
import { AuthError, authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { button } from "@/components/landing/styles";
import { loginAction, type AuthFormState } from "@/lib/auth/actions";
import { ojsLinks } from "@/lib/links";

const initialState: AuthFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    // Remounts after a rejected sign-in so the username stays filled in.
    <form key={state.attempt ?? 0} action={formAction} noValidate>
      <AuthError message={state.error} />

      <div className="mb-4">
        <label className={authLabelClass} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={authFieldClass}
          placeholder="Your journal username"
          defaultValue={state.values?.username}
        />
      </div>

      <div className="mb-5">
        <div className="flex items-baseline justify-between gap-4">
          <label className={authLabelClass} htmlFor="password">
            Password
          </label>
          <a
            className="mb-1.5 rounded-sm text-sm font-semibold text-[#07868f] transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
            href={ojsLinks.lostPassword}
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={authFieldClass}
          placeholder="Your password"
        />
      </div>

      <button type="submit" disabled={pending} className={`${button} w-full disabled:opacity-60`}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
