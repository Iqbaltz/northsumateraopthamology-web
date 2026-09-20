import type { Metadata } from "next";
import {
  AboutJournalSection,
  BenefitsSection,
  HeroSection,
  IndexingSection,
  LatestArticlesSection,
  MetricsSection,
  MotionEffects,
  QuickLinksSection,
  ScopeSection,
  SubmissionGuideSection,
} from "@/components/landing";
import { StructuredData } from "@/components/StructuredData";
import { getCurrentIssueSummary, getLatestArticles } from "@/lib/ojs/view";

export const metadata: Metadata = {
  title: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
  description:
    "A peer-reviewed, open-access journal in ophthalmology and vision science. Published by Rumah Sakit Khusus Mata Mencirim 77 Medan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
    description:
      "Peer-reviewed, open-access journal publishing high-impact research across ophthalmology and vision science.",
    url: "/",
    locale: "en_US",
  },
};

export default async function HomePage() {
  // Live journal data; both fall back to the designed content when OJS has
  // nothing published or is unreachable.
  const [issue, latestArticles] = await Promise.all([
    getCurrentIssueSummary(),
    getLatestArticles(4),
  ]);

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <StructuredData />
      <MotionEffects />
      <HeroSection />
      <QuickLinksSection />
      <AboutJournalSection issue={issue} />
      <IndexingSection />
      <LatestArticlesSection items={latestArticles} />
      <ScopeSection />
      <MetricsSection />
      <BenefitsSection />
      <SubmissionGuideSection />
    </div>
  );
}
