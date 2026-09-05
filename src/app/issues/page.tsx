import type { Metadata } from "next";
import {
  IssueArticlesSection,
  IssueHeroSection,
  VolumeCatalogSection,
  issuesContent,
} from "@/components/issues";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "Vol. 12 No. 1 (June 2026)",
  description:
    "Current issue of JONSON: original research, clinical studies, review articles, and case reports on retinal diseases, glaucoma, corneal disorders, and ocular health.",
  alternates: {
    canonical: "/issues",
  },
  openGraph: {
    title: "Vol. 12 No. 1 (June 2026) · JONSON",
    description:
      "Browse the articles published in the current issue of JONSON, plus the full volume catalog.",
    url: "/issues",
    locale: "en_US",
  },
};

export default function IssuesPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <IssueHeroSection issue={issuesContent.hero} />
      <IssueArticlesSection
        title={issuesContent.articles.title}
        items={issuesContent.articles.items}
      />
      <VolumeCatalogSection />
    </div>
  );
}
