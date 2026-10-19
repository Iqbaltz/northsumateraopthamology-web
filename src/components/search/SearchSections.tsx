import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Pagination } from "@/components/Pagination";
import { MagnifyingGlass } from "@/components/icons";
import { shell, textLink } from "@/components/landing/styles";
import type { SearchResultPage } from "@/lib/search";
import { searchContent, type ArticleType, type SearchResult, type SearchValues } from "./content";
import { activeFilterCount, searchPath, unfilteredSearchPath } from "./path";
import { SearchForm } from "./SearchForm";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2";

function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <article className="group rounded-lg border border-[#dfe5e8] bg-white p-5 sm:p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#a9cacc] hover:shadow-[0_18px_30px_-24px_rgba(0,0,0,0.25)]">
      <span className="inline-block rounded-md bg-[#e9eef1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] leading-4 text-[#3f4b5b]">
        {result.tag}
      </span>
      <p className="mt-3 text-xs sm:text-sm leading-snug text-[#0c0c0c]">{result.issue}</p>
      <h2 className="mt-2 text-base sm:text-lg font-semibold leading-snug text-[#0c0c0c]">
        <Link
          className={`rounded-sm transition-colors duration-200 hover:text-[#07868f] group-hover:text-[#07868f] ${focusRing}`}
          href={result.href}
        >
          {result.title}
        </Link>
      </h2>
      {result.authors && (
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#4a4a4a]">{result.authors}</p>
      )}

      {result.abstract && (
        <div className="mt-4 border-t border-[#e3eaef] pt-4">
          <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-[#0c0c0c]">
            {result.abstract.label && (
              <strong className="font-bold">{result.abstract.label}: </strong>
            )}
            {result.abstract.text}
          </p>
        </div>
      )}

      <div className="mt-5 flex items-end justify-between gap-4 text-xs">
        <p className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[#8d8d8d]">
          <span>{result.date}</span>
          {result.doi && (
            <>
              <span className="text-[#c7cfd3]" aria-hidden>
                |
              </span>
              <span className="min-w-0 break-all">
                {searchContent.doi}{" "}
                <a
                  className={`rounded-sm text-[#07868f] transition-colors duration-200 hover:text-[#066e75] ${focusRing}`}
                  href={result.doi}
                >
                  {result.doi}
                </a>
              </span>
            </>
          )}
        </p>
        {/* Only once OJS has a file for the article. */}
        {result.downloadHref && (
          <a
            className={`flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-bold text-[#07868f] transition-colors duration-200 hover:text-[#066e75] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5 ${focusRing}`}
            href={result.downloadHref}
            aria-label={`Download ${result.title} as ${result.format}`}
          >
            {result.format}
            <Image className="size-[18px]" src="/figma/download.svg" alt="" width={18} height={18} />
          </a>
        )}
      </div>
    </article>
  );
}

function NoResults({ resetHref }: { resetHref?: string }) {
  const content = searchContent.empty;

  return (
    <div className="rounded-lg border border-dashed border-[#d5e0e2] px-6 py-14 text-center">
      <MagnifyingGlass className="mx-auto size-8 text-[#9aa8ae]" />
      <h2 className="mt-4 text-lg font-bold text-[#0c0c0c]">{content.title}</h2>
      <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-[#4a4a4a]">{content.text}</p>
      {resetHref && (
        <Link className={`${textLink} mt-5 text-sm uppercase`} href={resetHref} scroll={false}>
          {content.reset}
        </Link>
      )}
    </div>
  );
}

/** The search page: filters beside one page of matching articles. */
export function SearchResultsSection({
  values,
  articleTypes,
  results,
}: {
  values: SearchValues;
  articleTypes: ArticleType[];
  results: SearchResultPage;
}) {
  return (
    <section className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      <div className={shell}>
        <Breadcrumb items={searchContent.breadcrumb} />

        <SearchForm
          values={values}
          articleTypes={articleTypes}
          heading={searchContent.results(results.total)}
        >
          {results.results.length ? (
            <>
              <ol className="grid gap-5">
                {results.results.map((result) => (
                  <li key={result.slug}>
                    <SearchResultCard result={result} />
                  </li>
                ))}
              </ol>
              <Pagination
                page={results.page}
                totalPages={results.totalPages}
                hrefFor={(page) => searchPath(values, page)}
              />
            </>
          ) : (
            <NoResults
              resetHref={activeFilterCount(values) ? unfilteredSearchPath(values) : undefined}
            />
          )}
        </SearchForm>
      </div>
    </section>
  );
}
