import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CreativeCommonsBadge } from "@/components/CreativeCommonsBadge";
import { journal, type IssueArticle } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { button, shell } from "@/components/landing/styles";
import {
  articleContent,
  type AbstractPart,
  type ArticleDetail,
  type ArticleReference,
  type MonthlyDownloads,
} from "./content";
import { DownloadMetricsChart } from "./DownloadMetricsChart";

/** Abstract, metrics and references share a narrower column than the page shell. */
const readingColumn = "mx-auto max-w-[1080px]";
const sectionTitleClass = "text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]";
const proseClass = "text-base leading-[26px] text-[#3f3f3f]";
const tealLinkClass =
  "rounded-sm font-medium text-[#07868f] transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [overflow-wrap:anywhere]";

/** Renders `*spans*` in a citation as italics. */
function withEmphasis(text: string) {
  return text
    .split(/\*(.+?)\*/)
    .map((part, index) => (index % 2 === 1 ? <em key={index}>{part}</em> : part));
}

function DoiLine({ doi, className = "" }: { doi: string; className?: string }) {
  return (
    <p className={`min-w-0 text-sm leading-6 text-[#0c0c0c] ${className}`}>
      <strong className="font-bold">{articleContent.doiLabel}</strong>{" "}
      <a className={tealLinkClass} href={doi}>
        {doi}
      </a>
    </p>
  );
}

export function ArticleHeroSection({ detail }: { detail: ArticleDetail }) {
  const { article, issue } = detail;
  const license = landingContent.footer.license;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={detail.breadcrumb} />

        <div className="mt-8 sm:mt-12 grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-10 lg:gap-16 max-[1200px]:grid-cols-1">
          <div data-reveal>
            <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
              {article.title}
            </h1>
            <DoiLine doi={detail.doi} className="mt-5 sm:text-base" />

            <ul className="mt-6 divide-y divide-[#dfe7ea] border-y border-[#dfe7ea]">
              {article.authors.map((author) => (
                <li key={author.name} className="py-3.5">
                  <p className="text-base font-bold leading-snug text-[#0c0c0c]">{author.name}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#5c6b73]">
                    {author.affiliation}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#3f3f3f]">
              <strong className="font-bold text-[#0c0c0c]">{articleContent.keywordsLabel}</strong>{" "}
              {detail.keywords.join(", ")}
            </p>
          </div>

          <aside
            className="overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)]"
            aria-label="Publication details"
            data-reveal
            data-reveal-delay="120"
          >
            <div className="grid grid-cols-[132px_minmax(0,1fr)] items-center gap-6 p-6 sm:p-7 max-[700px]:grid-cols-[92px_minmax(0,1fr)] max-[700px]:gap-4 max-[700px]:p-4">
              <div className="relative h-[184px] overflow-hidden rounded-md shadow-[0_10px_20px_-14px_rgba(0,0,0,0.45)] max-[700px]:h-[128px]">
                <Image
                  className="object-cover"
                  src={`/figma/${issue.cover}`}
                  alt={issue.coverAlt}
                  fill
                  sizes="(max-width: 700px) 92px, 132px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-[#07868f]">
                  {articleContent.publishedLabel} {issue.publishedOn}
                </p>
                <p className="mt-2 text-base sm:text-[22px] font-bold leading-tight text-[#07868f]">
                  {issue.citation}: <span className="uppercase">{journal.title}</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={issue.href}
                    className={`${button} !min-h-0 px-4 py-2 text-xs tracking-[0.04em] max-[700px]:px-3 max-[700px]:py-1.5 max-[700px]:text-[10px]`}
                  >
                    {articleContent.viewIssue}
                  </Link>
                  <small className="text-[11px] leading-tight text-[#666]">
                    {journal.issnOnline}
                    <br />
                    {journal.issnPrint}
                  </small>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e3eaef] px-6 py-5 sm:px-7 max-[700px]:px-4">
              {/* The flex-basis lets the action drop below on narrow cards instead of squeezing the text. */}
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <DoiLine doi={detail.doi} className="flex-1 basis-[260px]" />
                <a
                  className="flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-bold leading-6 text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
                  href={article.downloadHref}
                  aria-label={`Download ${article.title} as ${article.format}`}
                >
                  {articleContent.downloadLabel}
                  <Image
                    className="size-[18px]"
                    src="/figma/download.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                </a>
              </div>
              <p className="mt-1.5 text-sm leading-6 text-[#0c0c0c]">
                <strong className="font-bold">{articleContent.sectionLabel}</strong> {article.tag}
              </p>
            </div>

            <div className="border-t border-[#e3eaef] bg-[#f7f9fa] px-6 py-5 sm:px-7 max-[700px]:px-4">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <p className="min-w-0 flex-1 basis-[260px] text-sm leading-6 text-[#0c0c0c]">
                  <strong className="font-bold">{articleContent.licenseLabel}</strong>{" "}
                  {detail.copyright.notice}{" "}
                  <span className="uppercase">{detail.copyright.holder}</span>
                </p>
                <CreativeCommonsBadge />
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5c6b73]">
                {license.prefix}{" "}
                <a
                  className={`${tealLinkClass} underline underline-offset-2`}
                  href={license.href}
                  target="_blank"
                  rel="license noopener noreferrer"
                >
                  {license.name}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ArticleAbstractSection({ parts }: { parts: AbstractPart[] }) {
  return (
    <section className="bg-white pt-14 sm:pt-20 pb-12 sm:pb-16">
      <div className={shell}>
        <div className={readingColumn} data-reveal>
          <h2 className={sectionTitleClass}>{articleContent.abstractTitle}</h2>
          <div className="mt-5 grid gap-4">
            {parts.map((part) => (
              <p key={part.label} className={proseClass}>
                <strong className="font-bold text-[#0c0c0c]">{part.label}:</strong> {part.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleMetricsSection({ downloads }: { downloads: MonthlyDownloads[] }) {
  const content = articleContent.metrics;
  const range = `${downloads[0].label} – ${downloads[downloads.length - 1].label}`;

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className={shell}>
        <div className={readingColumn} data-reveal>
          <h2 className={sectionTitleClass}>{content.title}</h2>
          <p className="mt-2 text-sm text-[#5c6b73]">Monthly downloads, {range}</p>
          <DownloadMetricsChart
            data={downloads}
            unit={content.unit}
            caption={`Monthly downloads, ${range}`}
          />
        </div>
      </div>
    </section>
  );
}

export function ArticleReferencesSection({ references }: { references: ArticleReference[] }) {
  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className={shell}>
        <div className={readingColumn} data-reveal>
          <h2 className={sectionTitleClass}>{articleContent.referencesTitle}</h2>
          <ol className="mt-6 grid list-decimal gap-4 pl-6 text-sm sm:text-[15px] leading-relaxed text-[#3f3f3f] marker:font-semibold marker:text-[#5c6b73]">
            {references.map((reference) => (
              <li key={reference.text} className="pl-1.5">
                {withEmphasis(reference.text)}
                {reference.url && (
                  <a
                    className={`${tealLinkClass} mt-1 block w-fit max-w-full`}
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {reference.url}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function SimilarArticlesSection({ articles }: { articles: IssueArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-[#eef1f3] bg-white py-14 sm:py-20">
      <div className={shell}>
        <h2
          className="mb-8 sm:mb-10 text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]"
          data-reveal
        >
          {articleContent.similarTitle}
        </h2>
        <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} meta={`Pages ${article.pages}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
