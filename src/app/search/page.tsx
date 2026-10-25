import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionEffects } from "@/components/landing";
import {
  SearchResultsSection,
  parseSearchValues,
  requestedPage,
  searchPath,
} from "@/components/search";
import { getSearchIndex } from "@/lib/ojs/view";
import { searchRecords } from "@/lib/search";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { query } = parseSearchValues(await searchParams);

  return {
    title: query ? `Search: ${query}` : "Search",
    description:
      "Search the articles published in JONSON by keyword, author, publication date, and article type.",
    alternates: {
      canonical: "/search",
    },
    // Result lists only reshuffle articles that have their own pages; let
    // crawlers follow them without indexing every combination of filters.
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const values = parseSearchValues(params);
  const { records, articleTypes } = await getSearchIndex();
  const results = searchRecords(records, values, requestedPage(params));
  if (results.page > Math.max(results.totalPages, 1)) notFound();

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      {/* Each search swaps the page in place; remount so the breadcrumb and
          pagination it brings in are revealed too. */}
      <MotionEffects key={searchPath(values, results.page)} />
      <SearchResultsSection values={values} articleTypes={articleTypes} results={results} />
    </div>
  );
}
