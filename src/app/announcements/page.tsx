import type { Metadata } from "next";
import { AnnouncementListSection, announcementsContent } from "@/components/announcements";
import { MotionEffects } from "@/components/landing";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Announcements",
  description: announcementsContent.hero.description,
  alternates: {
    canonical: "/announcements",
  },
  openGraph: {
    title: "Announcements · JONSON",
    description: announcementsContent.hero.description,
    url: "/announcements",
    locale: "en_US",
  },
};

export default function AnnouncementsPage() {
  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <PageHero
        breadcrumb={announcementsContent.breadcrumb}
        title={announcementsContent.hero.title}
        description={announcementsContent.hero.description}
      />
      <AnnouncementListSection />
    </div>
  );
}
