"use client";

import { useActionState } from "react";
import { AuthError, authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { button } from "@/components/landing/styles";
import { loginAction, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} noValidate>
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
        />
      </div>

      <div className="mb-5">
        <label className={authLabelClass} htmlFor="password">
          Password
        </label>
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
