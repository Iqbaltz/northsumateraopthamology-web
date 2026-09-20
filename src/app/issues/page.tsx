import type { Metadata } from "next";
import {
  IssueArticlesSection,
  IssueHeroSection,
  VolumeCatalogSection,
  issuesContent,
} from "@/components/issues";
import { MotionEffects } from "@/components/landing";
import { getCurrentIssueView, getVolumeCards } from "@/lib/ojs/view";

export async function generateMetadata(): Promise<Metadata> {
  const current = await getCurrentIssueView();
  const title = current?.identifier ?? "Current Issue";

  return {
    title,
    description:
      "Current issue of JONSON: original research, clinical studies, review articles, and case reports on retinal diseases, glaucoma, corneal disorders, and ocular health.",
    alternates: {
      canonical: "/issues",
    },
    openGraph: {
      title: `${title} · JONSON`,
      description:
        "Browse the articles published in the current issue of JONSON, plus the full volume catalog.",
      url: "/issues",
      locale: "en_US",
    },
  };
}

export default async function IssuesPage() {
  // "New issue" is simply the latest published volume; the designed placeholder
  // issue only stands in while the journal has nothing published.
  const current = await getCurrentIssueView();

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <IssueHeroSection issue={current?.hero ?? issuesContent.hero} />
      <IssueArticlesSection
        title={issuesContent.articles.title}
        items={current?.articles ?? issuesContent.articles.items}
      />
      <VolumeCatalogSection volumes={await getVolumeCards(3)} />
    </div>
  );
}
