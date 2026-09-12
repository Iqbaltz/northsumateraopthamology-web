import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { countryOptions } from "@/lib/ojs/auth";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a JONSON account to submit manuscripts, serve as a reviewer, and follow new issues.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};

export default async function RegisterPage() {
  // Pulled from the OJS form itself so the option list never drifts.
  const countries = await countryOptions();

  return (
    <AuthShell
      kicker="JOURNAL ACCESS"
      title="Create an Account"
      description="Register once to submit manuscripts, review for the journal, and follow new issues."
      footer={{
        text: "Already registered?",
        linkLabel: "Sign in instead",
        href: "/login",
      }}
    >
      <RegisterForm countries={countries} />
    </AuthShell>
  );
}
