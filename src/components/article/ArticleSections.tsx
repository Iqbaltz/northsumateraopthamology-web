import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CreativeCommonsBadge } from "@/components/CreativeCommonsBadge";
import { articleMeta, coverSrc, issnLines, type IssueArticle } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { BookOpen } from "@/components/icons";
import { button, outlineButton, shell } from "@/components/landing/styles";
import { getJournalIssn } from "@/lib/ojs/view";
import {
  articleContent,
  type AbstractPart,
  type ArticleDetail,
  type ArticleReference,
  type MonthlyDownloads,
} from "./content";
import { DownloadMetricsChart } from "./DownloadMetricsChart";
import { ReadArticleButton } from "./ReadArticleButton";

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
      {doi ? (
        <a className={tealLinkClass} href={doi}>
          {doi}
        </a>
      ) : (
        // No DOI assigned in OJS yet.
        "-"
      )}
    </p>
  );
}

export async function ArticleHeroSection({ detail }: { detail: ArticleDetail }) {
  const { article, issue } = detail;
  const issn = issnLines(await getJournalIssn());
  const license = landingContent.footer.license;
  // The download link saves the file; the same link without the flag opens it in the browser.
  const readHref = article.downloadHref.replace(/\?download$/, "");
  const hasFile = Boolean(article.downloadHref);

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={detail.breadcrumb} />

        <div className="mt-8 sm:mt-12 grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-10 lg:gap-16 max-[1200px]:grid-cols-1">
          <div data-reveal>
            <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
              {article.title}
            </h1>

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
            <div className="grid grid-cols-[200px_minmax(0,1fr)] items-center gap-8 p-7 sm:p-8 max-[700px]:grid-cols-[104px_minmax(0,1fr)] max-[700px]:gap-4 max-[700px]:p-4">
              <div className="relative h-[262px] overflow-hidden rounded-md shadow-[0_10px_20px_-14px_rgba(0,0,0,0.45)] max-[700px]:h-[136px]">
                <Image
                  className="object-contain"
                  src={coverSrc(issue.cover)}
                  alt={issue.coverAlt}
                  fill
                  sizes="(max-width: 700px) 104px, 200px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-lg font-medium text-[#07868f]">
                  {articleContent.publishedLabel} {issue.publishedOn}
                </p>
                <Link
                  href={issue.href}
                  className="mt-5 block rounded-sm text-lg sm:text-[26px] font-bold leading-tight text-[#0c0c0c] underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] max-[700px]:mt-3 [overflow-wrap:anywhere]"
                >
                  {issue.citation}
                </Link>
                <p className="mt-5 text-xs sm:text-sm leading-[1.6] text-[#0c0c0c] max-[700px]:mt-3">
                  {issn.online}
                  <br />
                  {issn.print}
                </p>
              </div>
            </div>

            <div className="border-t border-[#e3eaef] px-7 py-6 sm:px-8 max-[700px]:px-4">
              <DoiLine doi={detail.doi} className="text-base" />
              <p className="mt-3 text-base leading-6 text-[#0c0c0c]">
                <strong className="font-bold">{articleContent.sectionLabel}</strong> {article.tag}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {hasFile ? (
                  <>
                    <ReadArticleButton
                      href={readHref}
                      title={article.title}
                      className={`${button} gap-2.5 text-sm uppercase`}
                      closeLabel={articleContent.closeLabel}
                      downloadHref={article.downloadHref}
                      downloadLabel={articleContent.downloadLabel}
                    >
                      <BookOpen />
                      {articleContent.readLabel}
                    </ReadArticleButton>
                    <a
                      className={`${button} ${outlineButton} gap-2.5 text-sm uppercase`}
                      href={article.downloadHref}
                      aria-label={`Download ${article.title} as ${article.format}`}
                    >
                      {articleContent.downloadLabel}
                      <Image className="size-[18px]" src="/figma/download.svg" alt="" width={18} height={18} />
                    </a>
                  </>
                ) : (
                  // No PDF in OJS yet: keep the buttons in place, but inert.
                  <>
                    <button
                      type="button"
                      disabled
                      className={`${button} pointer-events-none gap-2.5 text-sm uppercase opacity-45`}
                    >
                      <BookOpen />
                      {articleContent.readLabel}
                    </button>
                    <button
                      type="button"
                      disabled
                      className={`${button} ${outlineButton} pointer-events-none gap-2.5 text-sm uppercase opacity-45`}
                    >
                      {articleContent.downloadLabel}
                      <Image className="size-[18px]" src="/figma/download.svg" alt="" width={18} height={18} />
                    </button>
                  </>
                )}
              </div>
              {!hasFile && (
                <p className="mt-3 text-sm leading-6 text-[#5c6b73]">{articleContent.noFileNote}</p>
              )}
            </div>

            <div className="border-t border-[#e3eaef] px-7 py-6 sm:px-8 max-[700px]:px-4">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <p className="min-w-0 flex-1 basis-[260px] text-base leading-7 text-[#0c0c0c]">
                  <strong className="font-bold">{articleContent.licenseLabel}</strong>{" "}
                  {detail.copyright.notice}{" "}
                  <span className="uppercase">{detail.copyright.holder}</span>
                </p>
                <CreativeCommonsBadge />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5c6b73]">
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
            <ArticleCard key={article.slug} article={article} meta={articleMeta(article)} />
          ))}
        </div>
      </div>
    </section>
  );
}
