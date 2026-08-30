import type { Metadata } from "next";
import { ArchiveCatalogSection } from "@/components/archive";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "Archive Catalog",
  description:
    "Every published volume of JONSON. Issued biannually in February and August with original research, review articles, and case reports in ophthalmology and visual science.",
  alternates: {
    canonical: "/archive",
  },
  openGraph: {
    title: "Archive Catalog · JONSON",
    description: "Browse every published volume and issue of JONSON.",
    url: "/archive",
    locale: "en_US",
  },
};

export default function ArchivePage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <ArchiveCatalogSection />
    </div>
  );
}
