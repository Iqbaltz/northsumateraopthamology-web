import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleAbstractSection,
  ArticleHeroSection,
  ArticleMetricsSection,
  ArticleReferencesSection,
  SimilarArticlesSection,
  articleDetail,
  findArticle,
  similarArticles,
} from "@/components/article";
import { issueArticles } from "@/components/issues";
import { MotionEffects } from "@/components/landing";
import { getAllArticles, getArticleDetail } from "@/lib/ojs/view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Search snippets stop around 160 characters; cut on a word boundary before that. */
function summary(text: string, limit = 155): string {
  if (text.length <= limit) return text;
  const wordEnd = text.lastIndexOf(" ", limit);
  return `${text.slice(0, wordEnd > 0 ? wordEnd : limit)}…`;
}

export async function generateStaticParams() {
  // The journal's real articles when it has any, otherwise the designed set.
  const live = await getAllArticles();
  const slugs = live.length
    ? live.map((article) => article.slug)
    : issueArticles.map((article) => article.slug);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const live = await getArticleDetail(slug);
  const placeholder = live ? undefined : findArticle(slug);

  if (!live && !placeholder) {
    return { title: "Article not found" };
  }

  const detail = live ?? articleDetail(placeholder!);
  const article = detail.article;
  const description = summary(detail.abstract[0]?.text ?? article.title);

  return {
    title: article.title,
    description,
    keywords: detail.keywords,
    alternates: {
      canonical: article.href,
    },
    openGraph: {
      type: "article",
      title: `${article.title} · JONSON`,
      description,
      url: article.href,
      locale: "en_US",
      authors: article.authors.map((author) => author.name),
      section: article.tag,
      tags: detail.keywords,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // Published articles come from OJS; the designed set covers the rest.
  const live = await getArticleDetail(slug);
  const placeholder = live ? undefined : findArticle(slug);

  if (!live && !placeholder) {
    notFound();
  }

  const detail = live ?? articleDetail(placeholder!);
  const related = live
    ? (await getAllArticles()).filter((other) => other.slug !== slug)
    : similarArticles(placeholder!);

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <ArticleHeroSection detail={detail} />
      {/* OJS may not carry these yet; an empty section is left out entirely. */}
      {detail.abstract.length > 0 && <ArticleAbstractSection parts={detail.abstract} />}
      {detail.downloads.length > 0 && <ArticleMetricsSection downloads={detail.downloads} />}
      {detail.references.length > 0 && (
        <ArticleReferencesSection references={detail.references} />
      )}
      {related.length > 0 && <SimilarArticlesSection articles={related} />}
    </div>
  );
}
