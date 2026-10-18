import type { MetadataRoute } from "next";
import { announcementPath, announcements } from "@/components/announcements";
import { getAllArticles, getVolumeSlugs } from "@/lib/ojs/view";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jonson.org";
  const now = new Date();
  const [volumeSlugs, articles] = await Promise.all([getVolumeSlugs(), getAllArticles()]);

  return [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-board`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/publication-ethics`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-statement`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/announcements`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/issues`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/submission`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...announcements.map((announcement) => ({
      url: `${baseUrl}${announcementPath(announcement.slug)}`,
      lastModified: new Date(announcement.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...volumeSlugs.map((slug) => ({
      url: `${baseUrl}/archive/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    // Only the journal's real, published articles; never the designed placeholders.
    ...articles.map((article) => ({
      url: `${baseUrl}${article.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
