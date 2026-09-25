/** Import-free so site-wide content (nav, footer) can link here without a cycle. */
export const announcementsPath = "/announcements";

export const announcementPath = (slug: string) => `${announcementsPath}/${slug}`;
