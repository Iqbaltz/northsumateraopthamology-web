import type { Metadata } from "next";
import { ContactHeroSection, ContactOfficeSection } from "@/components/contact";
import { MotionEffects } from "@/components/landing";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Official contact channels of JONSON: Journal of North Sumatera Ophthalmology Nexus, part of Rumah Sakit Khusus Mata Mencirim 77 Medan: address, WhatsApp, telephone, and email.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact · JONSON",
    description: "How to reach the JONSON editorial office through its official contact channels.",
    url: "/contact",
    locale: "en_US",
  },
};

export default function ContactPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <ContactHeroSection />
      <ContactOfficeSection />
    </div>
  );
}
