import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AnnouncementDetailSection,
  announcementPath,
  announcements,
  findAnnouncement,
} from "@/components/announcements";
import { MotionEffects } from "@/components/landing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return announcements.map((announcement) => ({ slug: announcement.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const announcement = findAnnouncement(slug);

  if (!announcement) {
    return { title: "Announcement not found" };
  }

  const description = announcement.paragraphs[0];
  const href = announcementPath(announcement.slug);

  return {
    title: announcement.title,
    description,
    alternates: {
      canonical: href,
    },
    openGraph: {
      type: "article",
      title: `${announcement.title} · JONSON`,
      description,
      url: href,
      locale: "en_US",
      publishedTime: announcement.date,
    },
  };
}

export default async function AnnouncementPage({ params }: PageProps) {
  const { slug } = await params;
  const announcement = findAnnouncement(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <AnnouncementDetailSection announcement={announcement} />
    </div>
  );
}
