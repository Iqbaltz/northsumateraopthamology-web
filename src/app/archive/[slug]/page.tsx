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
import { getIssueView, getVolumeCards, getVolumeSlugs } from "@/lib/ojs/view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Prerender the journal's real volumes; fall back to the designed set when
  // OJS has nothing published yet.
  const live = await getVolumeSlugs();
  const slugs = live.length ? live : archiveIssues.map((issue) => issue.slug);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const live = await getIssueView(slug);
  const issue = live ? undefined : findArchiveIssue(slug);

  if (!live && !issue) {
    return { title: "Issue not found" };
  }

  const identifier = live ? live.identifier : issueIdentifier(issue!);
  const articleCount = live ? live.articles.length : issue!.articleCount;

  return {
    title: identifier,
    description: `Archived issue of JONSON — ${identifier}, with ${articleCount} open-access articles across ophthalmology and visual science.`,
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

  // The journal's own volume takes precedence; the designed set covers the
  // slugs OJS does not (yet) publish.
  const live = await getIssueView(slug);
  const fallback = live ? undefined : findArchiveIssue(slug);

  if (!live && !fallback) {
    notFound();
  }

  const hero = live ? live.hero : archiveIssueHero(fallback!);
  const articles = live ? live.articles : archiveIssueArticles(fallback!);

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <IssueHeroSection issue={hero} />
      <IssueArticlesSection title={archiveContent.articlesTitle} items={articles} />
      <VolumeCatalogSection volumes={await getVolumeCards(3)} />
    </div>
  );
}
