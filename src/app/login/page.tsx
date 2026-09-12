import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your JONSON account to submit manuscripts, track reviews, and manage your editorial work.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      kicker="JOURNAL ACCESS"
      title="Sign In"
      description="Use your JONSON journal account. After signing in you are taken straight to your dashboard."
      footer={{
        text: "Don't have an account yet?",
        linkLabel: "Register here",
        href: "/register",
      }}
    >
      <LoginForm />
    </AuthShell>
  );
}
