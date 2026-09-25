import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import { announcementPath, announcementsPath } from "./path";

export type Announcement = {
  slug: string;
  title: string;
  /** ISO `yyyy-mm-dd`. */
  date: string;
  paragraphs: string[];
  /** Sign-off lines, rendered together without paragraph spacing. */
  closing: string[];
  signature: string;
};

export const announcements: Announcement[] = [
  {
    slug: "call-for-papers-volume-12-issue-2",
    title: "Call for Papers: Volume 12, Issue 2",
    date: "2026-09-18",
    paragraphs: [
      "We are pleased to announce the opening of submissions for Volume 12, Issue 2 of Jonson.",
      "This issue welcomes high-quality manuscripts addressing current developments in ophthalmology, including clinical research, diagnostic approaches, surgical techniques, and advances in patient care.",
      "Authors are encouraged to review the journal's submission requirements and author guidelines before preparing their manuscripts.",
    ],
    closing: ["Thank you for your attention and continued cooperation.", "Sincerely,"],
    signature: `Chief Editor, ${journal.name}`,
  },
];

export const announcementsContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Announcements", href: announcementsPath },
  ] as BreadcrumbItem[],
  hero: {
    title: "Announcements",
    description: `News, calls for papers, and updates from the editorial office of ${journal.name}.`,
  },
  readMore: "Read announcement",
  empty: "There are no announcements yet.",
};

export function findAnnouncement(slug: string): Announcement | undefined {
  return announcements.find((announcement) => announcement.slug === slug);
}

export function announcementBreadcrumb(announcement: Announcement): BreadcrumbItem[] {
  return [
    ...announcementsContent.breadcrumb,
    { label: announcement.title, href: announcementPath(announcement.slug) },
  ];
}

/**
 * Dates are calendar days, so they are formatted in UTC: parsing `yyyy-mm-dd` yields
 * UTC midnight, which a local time zone west of UTC would show as the day before.
 */
export function formatAnnouncementDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
