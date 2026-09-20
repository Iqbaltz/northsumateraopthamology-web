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

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Search snippets stop around 160 characters; cut on a word boundary before that. */
function summary(text: string, limit = 155): string {
  if (text.length <= limit) return text;
  const wordEnd = text.lastIndexOf(" ", limit);
  return `${text.slice(0, wordEnd > 0 ? wordEnd : limit)}…`;
}

export function generateStaticParams() {
  return issueArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  const detail = articleDetail(article);
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
  const article = findArticle(slug);

  if (!article) {
    notFound();
  }

  const detail = articleDetail(article);

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <ArticleHeroSection detail={detail} />
      <ArticleAbstractSection parts={detail.abstract} />
      <ArticleMetricsSection downloads={detail.downloads} />
      <ArticleReferencesSection references={detail.references} />
      <SimilarArticlesSection articles={similarArticles(article)} />
    </div>
  );
}
