import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { archiveContent } from "@/components/archive";
import {
  IssueArticlesSection,
  IssueHeroSection,
  VolumeCatalogSection,
} from "@/components/issues";
import { MotionEffects } from "@/components/landing";
import { getIssueView, getVolumeCards, getVolumeSlugs } from "@/lib/ojs/view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Prerender the journal's published volumes; any volume published later is
  // rendered on first visit.
  const slugs = await getVolumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssueView(slug);

  if (!issue) {
    return { title: "Issue not found" };
  }

  const { identifier } = issue;

  return {
    title: identifier,
    description: `Archived issue of JONSON — ${identifier}, with ${issue.articles.length} open-access articles across ophthalmology and visual science.`,
    alternates: {
      canonical: `/archive/${slug}`,
    },
    openGraph: {
      title: `${identifier} · JONSON`,
      description: `Browse the articles published in ${identifier} of JONSON.`,
      url: `/archive/${slug}`,
      locale: "en_US",
    },
  };
}

export default async function ArchivedIssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = await getIssueView(slug);

  if (!issue) {
    notFound();
  }

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <IssueHeroSection issue={issue.hero} />
      <IssueArticlesSection title={archiveContent.articlesTitle} items={issue.articles} />
      <VolumeCatalogSection volumes={await getVolumeCards(3)} />
    </div>
  );
}
