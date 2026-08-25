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
} from "@/components/landing";
import { StructuredData } from "@/components/StructuredData";

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

export default function HomePage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <StructuredData />
      <MotionEffects />
      <HeroSection />
      <QuickLinksSection />
      <AboutJournalSection />
      <IndexingSection />
      <LatestArticlesSection />
      <ScopeSection />
      <MetricsSection />
      <BenefitsSection />
    </div>
  );
}
