import type { Metadata } from "next";
import { MotionEffects } from "@/components/landing";
import {
  ArticleTypesSection,
  AuthorFeesSection,
  AuthorResourcesSection,
  BeforeYouSubmitSection,
  CopyrightSection,
  HowToSubmitSection,
  ManuscriptPreparationSection,
  PrivacySection,
  RequiredFilesSection,
  SubmissionHelpSection,
  SubmissionHeroSection,
} from "@/components/submission";

export const metadata: Metadata = {
  title: "Submit Your Manuscript",
  description:
    "Submission guidelines for JONSON: scope and ethics checks, author templates, article types, required files, manuscript preparation, author fees, and how to submit through OJS.",
  alternates: {
    canonical: "/submission",
  },
  openGraph: {
    title: "Submit Your Manuscript · JONSON",
    description:
      "Everything authors need before submitting to JONSON: requirements, templates, article types, and the OJS submission steps.",
    url: "/submission",
    locale: "en_US",
  },
};

export default function SubmissionPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <SubmissionHeroSection />
      <BeforeYouSubmitSection />
      <AuthorResourcesSection />
      <ArticleTypesSection />
      <RequiredFilesSection />
      <ManuscriptPreparationSection />
      <HowToSubmitSection />
      <AuthorFeesSection />
      <PrivacySection />
      <CopyrightSection />
      <SubmissionHelpSection />
    </div>
  );
}
