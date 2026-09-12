"use client";

import { useActionState } from "react";
import { AuthError, authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { button } from "@/components/landing/styles";
import { registerAction, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = {};

export function RegisterForm({ countries }: { countries: { value: string; label: string }[] }) {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} noValidate>
      <AuthError message={state.error} />

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={authLabelClass} htmlFor="givenName">
            First name
          </label>
          <input id="givenName" name="givenName" required className={authFieldClass} />
        </div>
        <div>
          <label className={authLabelClass} htmlFor="familyName">
            Last name
          </label>
          <input id="familyName" name="familyName" className={authFieldClass} />
        </div>
      </div>

      <div className="mb-4">
        <label className={authLabelClass} htmlFor="affiliation">
          Affiliation
        </label>
        <input
          id="affiliation"
          name="affiliation"
          required
          className={authFieldClass}
          placeholder="Your institution"
        />
      </div>

      <div className="mb-4">
        <label className={authLabelClass} htmlFor="country">
          Country
        </label>
        <select id="country" name="country" required className={authFieldClass} defaultValue="">
          <option value="" disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className={authLabelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={authFieldClass}
        />
      </div>

      <div className="mb-4">
        <label className={authLabelClass} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className={authFieldClass}
        />
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={authLabelClass} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className={authFieldClass}
          />
        </div>
        <div>
          <label className={authLabelClass} htmlFor="password2">
            Repeat password
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            autoComplete="new-password"
            required
            className={authFieldClass}
          />
        </div>
      </div>

      <label className="mb-3 flex items-start gap-2.5 text-sm leading-6 text-[#4a4a4a]">
        <input
          type="checkbox"
          name="privacyConsent"
          value="1"
          required
          className="mt-1 size-4 shrink-0 accent-[#07868f]"
        />
        <span>
          Yes, I agree to have my data collected and stored according to the journal&rsquo;s privacy
          statement.
        </span>
      </label>

      <label className="mb-6 flex items-start gap-2.5 text-sm leading-6 text-[#4a4a4a]">
        <input
          type="checkbox"
          name="emailConsent"
          value="1"
          className="mt-1 size-4 shrink-0 accent-[#07868f]"
        />
        <span>Yes, I would like to be notified of new publications and announcements.</span>
      </label>

      <button type="submit" disabled={pending} className={`${button} w-full disabled:opacity-60`}>
        {pending ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}
