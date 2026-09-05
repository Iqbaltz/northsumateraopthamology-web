import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  archiveContent,
  archiveIssueArticles,
  archiveIssueHero,
  archiveIssues,
  findArchiveIssue,
  issueIdentifier,
} from "@/components/archive";
import {
  IssueArticlesSection,
  IssueHeroSection,
  VolumeCatalogSection,
} from "@/components/issues";
import { MotionEffects } from "@/components/landing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return archiveIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = findArchiveIssue(slug);

  if (!issue) {
    return { title: "Issue not found" };
  }

  const identifier = issueIdentifier(issue);

  return {
    title: identifier,
    description: `Archived issue of JONSON — ${identifier}, with ${issue.articleCount} open-access articles across ophthalmology and visual science.`,
    alternates: {
      canonical: `/archive/${issue.slug}`,
    },
    openGraph: {
      title: `${identifier} · JONSON`,
      description: `Browse the articles published in ${identifier} of JONSON.`,
      url: `/archive/${issue.slug}`,
      locale: "en_US",
    },
  };
}

export default async function ArchivedIssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = findArchiveIssue(slug);

  if (!issue) {
    notFound();
  }

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <IssueHeroSection issue={archiveIssueHero(issue)} />
      <IssueArticlesSection
        title={archiveContent.articlesTitle}
        items={archiveIssueArticles(issue)}
      />
      <VolumeCatalogSection />
    </div>
  );
}
