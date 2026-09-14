import type { Metadata } from "next";
import {
  AboutHeroSection,
  AboutPoliciesSections,
  AimsScopeSection,
  JournalInformationSection,
} from "@/components/about";
import { VolumeCatalogSection } from "@/components/issues";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "About the Journal",
  description:
    "About JONSON: aims and scope, journal information, peer review process, open access, archiving, and copyright policies of the Journal of North Sumatera Ophthalmology Nexus.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the Journal · JONSON",
    description:
      "Aims, scope, and editorial policies of JONSON, a peer-reviewed, open-access journal in ophthalmology and vision science.",
    url: "/about",
    locale: "en_US",
  },
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <AboutHeroSection />
      <AimsScopeSection />
      <JournalInformationSection />
      <AboutPoliciesSections />
      <VolumeCatalogSection />
    </div>
  );
}
