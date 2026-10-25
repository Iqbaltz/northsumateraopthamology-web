import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { contactPath } from "@/components/contact/path";
import { journal } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { submissionAnchors } from "@/components/submission/content";
import { ACTIVATE_PATH, type ActivationStatus, CHECK_EMAIL_PATH } from "@/lib/auth/registration";

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

/** What the activation page says for a link that can't be used (any status but `pending`). */
export type ActivationOutcome = {
  title: string;
  text: string;
  cta: { label: string; href: string };
};

export const activateContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Registration Confirmation", href: ACTIVATE_PATH },
  ] as BreadcrumbItem[],
  title: "Confirm and activate your account",
  submit: "Activate Account",
  submitting: "Activating…",
  outcomes: {
    activated: {
      title: "Your account is already active",
      text: "This activation link has already been used, so there is nothing more to do. Sign in with the username and password you registered with.",
      cta: { label: "Sign in", href: "/login" },
    },
    expired: {
      title: "This activation link has expired",
      text: "Activation links are only valid for a limited time. Contact the editorial office and we will activate your account for you.",
      cta: { label: "Contact us", href: contactPath },
    },
    invalid: {
      title: "This activation link doesn't work",
      text: "Part of the link may be missing; some email apps break long links. Open it again straight from your confirmation email, or contact the editorial office for help.",
      cta: { label: "Contact us", href: contactPath },
    },
  } satisfies Record<Exclude<ActivationStatus, "pending">, ActivationOutcome>,
  /** Followed by the editorial office's address. */
  assistance: "If you need assistance, please contact",
  email: landingContent.header.email,
};
