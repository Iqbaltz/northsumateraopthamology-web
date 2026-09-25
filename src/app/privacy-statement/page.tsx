import type { Metadata } from "next";
import { MotionEffects } from "@/components/landing";
import { PageHero } from "@/components/PageHero";
import { privacyContent } from "@/components/privacy";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: privacyContent.hero.description,
  alternates: {
    canonical: "/privacy-statement",
  },
  openGraph: {
    title: "Privacy Statement · JONSON",
    description: "How JONSON uses the names and email addresses entered on this journal site.",
    url: "/privacy-statement",
    locale: "en_US",
  },
};

export default function PrivacyStatementPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <PageHero
        className="min-h-[360px] sm:min-h-[440px]"
        breadcrumb={privacyContent.breadcrumb}
        title={privacyContent.hero.title}
        description={privacyContent.hero.description}
      />
    </div>
  );
}
