import type { Metadata } from "next";
import {
  EditorialContactSection,
  EditorialHeroSection,
  EditorialIndependenceSection,
  EditorialTeamSection,
} from "@/components/editorial";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "Editorial Board",
  description:
    "Meet the editors and editorial board members of JONSON: Journal of North Sumatera Ophthalmology Nexus, and how to contact the editorial office.",
  alternates: {
    canonical: "/editorial-board",
  },
  openGraph: {
    title: "Editorial Board · JONSON",
    description:
      "The editors and board members who uphold the scholarly quality and editorial standards of JONSON.",
    url: "/editorial-board",
    locale: "en_US",
  },
};

export default function EditorialBoardPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <EditorialHeroSection />
      <EditorialTeamSection />
      <EditorialIndependenceSection />
      <EditorialContactSection />
    </div>
  );
}
