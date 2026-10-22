import type { Metadata } from "next";
import { AuthNotice, AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your JONSON account to submit manuscripts, track reviews, and manage your editorial work.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  // Where the activation page sends a just-activated account (ACTIVATED_LOGIN_PATH).
  const activated = (await searchParams).activated !== undefined;

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
      {activated && (
        <AuthNotice message="Your account is now active. Sign in with the username and password you registered with." />
      )}
      <LoginForm />
    </AuthShell>
  );
}
