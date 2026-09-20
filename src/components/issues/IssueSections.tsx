import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import { VolumeCard } from "@/components/VolumeCard";
import { ojsLinks } from "@/lib/links";
import { button, shell, textLink } from "@/components/landing/styles";
import type { IssueArticle } from "./journal";
import { issuesContent } from "./content";

/** Everything the issue hero renders, for the current issue or an archived one. */
export type IssueHero = {
  breadcrumb: BreadcrumbItem[];
  kicker: string;
  volumeTitle: string;
  publishMonth: string;
  description: string;
  /** Omitted for archived issues — the reader is already on the issue. */
  viewIssue?: { label: string; href: string };
  cover: string;
  coverAlt: string;
  issnOnline: string;
  issnPrint: string;
  downloadLabel: string;
  publishedOn: string;
  heading: string;
  p1: string;
  p2: string;
  facts: { title: string; text: string }[];
};

export function IssueHeroSection({ issue }: { issue: IssueHero }) {
  const content = issue;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={content.breadcrumb} />

        <div className="mt-6 sm:mt-8 grid grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] items-start gap-8 lg:gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-10">
          <div
            className="group overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow,transform] duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#b6d1d3]"
            data-reveal
          >
            <div className="grid grid-cols-[minmax(0,340px)_minmax(0,1fr)] items-center gap-6 lg:gap-8 p-5 sm:p-6 max-[700px]:grid-cols-[120px_1fr] max-[700px]:gap-4 max-[700px]:p-4">
              <div className="relative h-[300px] lg:h-[390px] overflow-hidden rounded-lg max-[700px]:h-[170px]">
                <Image
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
                  src={`/figma/${content.cover}`}
                  alt={content.coverAlt}
                  fill
                  loading="eager"
                  sizes="(max-width: 700px) 120px, (max-width: 1200px) 300px, 340px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#5c5c5c]">
                  {content.kicker}
                </p>
                <h1 className="mt-2.5 mb-1.5 text-xl sm:text-[32px] font-bold leading-tight whitespace-pre-line text-[#0c0c0c]">
                  {content.volumeTitle}
                </h1>
                <p className="mb-3 text-base sm:text-xl font-semibold leading-tight text-[#0c0c0c]">
                  {content.publishMonth}
                </p>
                <p className="mb-5 max-w-[300px] text-xs sm:text-sm leading-relaxed text-[#4a4a4a]">
                  {content.description}
                </p>
                {content.viewIssue && (
                  <Link
                    href={content.viewIssue.href}
                    className={`${button} w-fit max-[700px]:min-h-0 max-[700px]:px-2.5 max-[700px]:py-1.5 max-[700px]:text-[10px]`}
                  >
                    {content.viewIssue.label}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#e3eaef] bg-[#f7f9fa] px-5 sm:px-6 py-4 max-[700px]:gap-2 max-[700px]:px-4 max-[700px]:py-3">
              <span className="flex items-center gap-3 sm:gap-4">
                <Image
                  className="shrink-0 size-8 sm:size-10"
                  src="/figma/file-doc.svg"
                  alt="Document icon"
                  width={40}
                  height={40}
                />
                <small className="text-[11px] sm:text-xs leading-tight text-[#666]">
                  {content.issnOnline}
                  <br />
                  {content.issnPrint}
                </small>
              </span>
              <a
                className="flex items-center gap-1.5 rounded-sm text-xs sm:text-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
                href={ojsLinks.currentIssue}
              >
                {content.downloadLabel}
                <Image
                  className="size-4 sm:size-5"
                  src="/figma/download.svg"
                  alt="Download icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>

          <div data-reveal data-reveal-delay="120">
            <p className="text-xs sm:text-sm font-semibold text-[#07868f]">
              {content.publishedOn}
            </p>
            <h2 className="mt-3 text-lg sm:text-2xl font-bold leading-tight uppercase text-[#0c0c0c]">
              {content.heading}
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#4a4a4a]">{content.p1}</p>
            <p className="mt-4 text-sm leading-6 text-[#4a4a4a]">{content.p2}</p>
            <dl className="mt-6 flex flex-col gap-4">
              {content.facts.map((fact) => (
                <div key={fact.title}>
                  <dt className="text-sm font-bold text-[#0c0c0c]">{fact.title}</dt>
                  <dd className="mt-0.5 text-sm leading-6 text-[#4a4a4a]">{fact.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IssueArticlesSection({
  title,
  items,
}: {
  title: string;
  items: IssueArticle[];
}) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className={shell}>
        <h2
          className="mb-8 sm:mb-10 text-2xl sm:text-[32px] font-bold leading-tight uppercase text-[#0c0c0c]"
          data-reveal
        >
          {title}
        </h2>
        <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {items.map((article) => (
            <ArticleCard key={article.slug} article={article} meta={article.date} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VolumeCatalogSection() {
  const content = issuesContent.catalog;

  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div
        className={`${shell} grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] items-stretch gap-10 lg:gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-8`}
      >
        <div className="flex flex-col" data-reveal>
          <h2 className="text-2xl sm:text-[32px] font-bold leading-tight whitespace-pre-line text-[#0c0c0c] max-[1200px]:whitespace-normal">
            {content.title}
          </h2>
          <p className="mt-5 text-sm leading-6 text-[#4a4a4a]">{content.description}</p>
          <Link className={`${textLink} mt-8 text-sm uppercase max-[1200px]:mt-6`} href="/archive">
            {content.viewAll}
            <Image
              className="size-5"
              src="/figma/caret-right.svg"
              alt="Right caret icon"
              width={20}
              height={20}
            />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[700px]:grid-cols-1">
          {content.items.map((volume) => (
            <VolumeCard key={volume.label} volume={volume} />
          ))}
        </div>
      </div>
    </section>
  );
}
