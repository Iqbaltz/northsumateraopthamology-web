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

/**
 * Announcements are kept here, newest first. Each gets a page at
 * /announcements/<slug>; while the list is empty the page shows `empty`.
 */
export const announcements: Announcement[] = [];

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
  empty: {
    title: "No announcements yet",
    text: "News, calls for papers, and updates from the editorial office will appear here once they are published.",
  },
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
