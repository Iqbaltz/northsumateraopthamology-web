import Image from "next/image";
import Link from "next/link";
import { aboutAnchors, aboutPath } from "@/components/about/anchors";
import { coverSrc } from "@/components/issues/journal";
import { landingContent, type ArticlePreview } from "./content";
import { kicker, shell, textLink } from "./styles";

/**
 * `items` carries the journal's published articles when OJS has any; without it
 * the section falls back to the designed placeholder list so the page is never
 * empty while the journal is still being filled in.
 */
export function LatestArticlesSection({ items }: { items?: ArticlePreview[] } = {}) {
  const content = landingContent.articlesSection;
  const articles = items?.length ? items : content.items;

  return (
    <section className="bg-white py-12 sm:py-24">
      <div className={shell}>
        <div
          className="mb-8 sm:mb-12 flex flex-wrap items-center justify-between gap-4"
          data-reveal
        >
          <h2 className="text-2xl sm:text-[32px] font-bold leading-tight uppercase text-[#0c0c0c]">
            {content.title}
          </h2>
          <Link
            className="group hidden sm:flex items-center gap-2 sm:gap-3 rounded-sm text-xs sm:text-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-x-1"
            href="/issues"
          >
            {content.viewAll}{" "}
            <Image
              src="/figma/caret-right.svg"
              alt="Right caret icon"
              width={20}
              height={20}
              className="sm:size-6"
            />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-6 lg:gap-8 max-[1200px]:grid-cols-1 max-[1200px]:gap-8 max-[700px]:gap-8">
          {articles.map((article) => (
            <article
              className="group overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#a9cacc] max-[1200px]:grid max-[1200px]:grid-cols-[45%_55%] max-[1200px]:h-[280px] max-[700px]:block max-[700px]:h-auto [&:nth-child(2)]:delay-[60ms] [&:nth-child(3)]:delay-[120ms] [&:nth-child(4)]:delay-[180ms]"
              key={article.title}
              data-reveal-item
            >
              <div className="relative h-[204px] overflow-hidden max-[1200px]:h-full max-[700px]:h-[180px]">
                <Image
                  className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
                  src={coverSrc(article.image)}
                  alt={article.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 45vw, 306px"
                />
              </div>
              <div className="flex min-h-[220px] sm:min-h-[260px] max-[1200px]:h-full max-[700px]:h-[240px] flex-col p-6 sm:p-8 justify-between">
                <div>
                  <span className="mb-2.5 inline-block rounded-md bg-[#e3eaef] px-2.5 py-1 text-xs font-semibold leading-4 text-[#0b1836] transition-[background-color,transform] duration-300">
                    {article.tag}
                  </span>
                  <h3 className="mb-2 text-base sm:text-lg leading-snug font-semibold text-[#0c0c0c]">
                    <Link
                      className="rounded-sm transition-colors duration-300 group-hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
                      href={article.href}
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#0c0c0c]">
                    {article.author}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-[#8d8d8d]">
                  <time>{article.date}</time>
                  <Image
                    className="size-5 sm:size-6 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                    src="/figma/arrow-up-right.svg"
                    alt="Open article"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex sm:hidden items-center justify-start">
          <Link
            className="group flex items-center gap-2 text-sm font-bold text-[#07868f] uppercase"
            href="/issues"
          >
            {content.viewAll}{" "}
            <Image
              src="/figma/caret-right.svg"
              alt="Right caret icon"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ScopeSection() {
  const content = landingContent.scope;

  return (
    <section id="aims-scope" className="scroll-mt-8 bg-white py-16 sm:py-24">
      <div className={shell}>
        {/*
          Above 1200px: illustration owns a left column, divider, all copy stacked on the right.
          Below 1200px: illustration sits beside the heading, body copy spans the full width under both.
        */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-6 min-[1201px]:grid-cols-[minmax(160px,260px)_minmax(0,1fr)] min-[1201px]:gap-x-0 min-[1201px]:gap-y-0">
          <div
            className="group col-start-2 row-start-1 flex items-start justify-end min-[1201px]:col-start-1 min-[1201px]:row-span-2 min-[1201px]:items-center min-[1201px]:justify-center min-[1201px]:pr-12"
            data-reveal
          >
            <Image
              className="size-28 sm:size-36 lg:size-[200px] shrink-0 object-contain transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.035] motion-safe:group-hover:rotate-1"
              src="/figma/aims-scope.webp"
              alt={content.scopeAlt}
              width={200}
              height={200}
            />
          </div>
          <div
            className="col-start-1 row-start-1 min-[1201px]:col-start-2 min-[1201px]:max-w-[840px] min-[1201px]:border-l min-[1201px]:border-[#d5e0e2] min-[1201px]:pl-12"
            data-reveal
          >
            <p className={kicker}>{content.kicker}</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-[32px] leading-tight font-bold text-[#0c0c0c]">
              {content.title}
            </h2>
          </div>
          <div
            className="col-span-2 row-start-2 min-[1201px]:col-span-1 min-[1201px]:col-start-2 min-[1201px]:max-w-[840px] min-[1201px]:border-l min-[1201px]:border-[#d5e0e2] min-[1201px]:pt-6 min-[1201px]:pl-12"
            data-reveal
          >
            <div className="flex flex-col gap-4 sm:gap-6 text-base leading-[25px] text-[#0c0c0c]">
              <p>{content.p1}</p>
              <p>{content.p2}</p>
            </div>
            <Link className={`${textLink} mt-6 sm:mt-8`} href={aboutPath(aboutAnchors.aimsScope)}>
              {content.cta}{" "}
              <Image
                src="/figma/arrow-up-right.svg"
                alt="Arrow pointing right"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
