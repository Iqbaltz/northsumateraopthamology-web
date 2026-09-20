import type { Metadata } from "next";
import { MotionEffects } from "@/components/landing";
import { PoliciesHeroSection, PolicySectionsList } from "@/components/policies";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Editorial policies of JONSON: peer review, editorial decisions, publication ethics, research misconduct, conflicts of interest, authorship, corrections and retractions, ethical approval, and editorial independence.",
  alternates: {
    canonical: "/policies",
  },
  openGraph: {
    title: "Editorial Policy · JONSON",
    description:
      "How JONSON reviews manuscripts, makes editorial decisions, and upholds publication ethics.",
    url: "/policies",
    locale: "en_US",
  },
};

export default function PoliciesPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <PoliciesHeroSection />
      <PolicySectionsList />
    </div>
  );
}
