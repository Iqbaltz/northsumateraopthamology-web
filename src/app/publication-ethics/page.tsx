import type { Metadata } from "next";
import { EthicsHeroSection, EthicsSectionsList } from "@/components/ethics";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "Publication Ethics",
  description:
    "Publication ethics at JONSON, based on COPE guidelines: duties of editors, reviewers, and authors, and the journal's retraction, withdrawal, correction, removal, and replacement policy.",
  alternates: {
    canonical: "/publication-ethics",
  },
  openGraph: {
    title: "Publication Ethics · JONSON",
    description:
      "The ethical standards JONSON expects of editors, reviewers, and authors, and how the journal handles retractions and corrections.",
    url: "/publication-ethics",
    locale: "en_US",
  },
};

export default function PublicationEthicsPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <EthicsHeroSection />
      <EthicsSectionsList />
    </div>
  );
}
