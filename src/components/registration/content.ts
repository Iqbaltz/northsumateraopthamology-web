import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { contactPath } from "@/components/contact/path";
import { journal } from "@/components/issues/journal";
import { submissionAnchors } from "@/components/submission/content";
import { CHECK_EMAIL_PATH } from "@/lib/auth/registration";

/** One "what next" row: a title and line on the left, a teal call to action on the right. */
export type NextStep = {
  title: string;
  text: string;
  cta: string;
  href: string;
};

export const checkEmailContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Registration Confirmation", href: CHECK_EMAIL_PATH },
  ] as BreadcrumbItem[],
  title: "Check your email to activate your account",
  subtitle: journal.name,
  /** Split around the address, which is set in bold when the page knows it. */
  intro: {
    before: "Your account has been created. We've sent a confirmation email to",
    fallbackAddress: "the email address you registered with",
    after:
      ". Follow the link in that email to activate your account; you can sign in as soon as it is activated.",
  },
  steps: [
    {
      title: "Didn't receive the email?",
      text: "It can take a few minutes to arrive. Check your spam or junk folder, or contact the editorial office if it still hasn't come through.",
      cta: "Contact us",
      href: contactPath,
    },
    {
      title: "Already activated your account?",
      text: "Sign in with your username and password to submit and track your manuscripts.",
      cta: "Sign in",
      href: "/login",
    },
    {
      title: "View Author Guidelines",
      text: "Review our submission requirements, manuscript preparation guidelines, and editorial policies.",
      cta: "Author guideline",
      href: `/submission#${submissionAnchors.preparation}`,
    },
    {
      title: "Explore Current Issue",
      text: "Discover the latest research articles and publications in ophthalmology.",
      cta: "New issue",
      href: "/issues",
    },
    {
      title: "Return to Homepage",
      text: "Learn more about the journal, its aims and scope, and recent announcements.",
      cta: "Homepage",
      href: "/",
    },
  ] as NextStep[],
  closing:
    "Thank you for joining our academic community. We look forward to supporting your contribution to ophthalmic research.",
};
