import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { VolumeCard } from "@/components/VolumeCard";
import { button, shell, textLink } from "@/components/landing/styles";
import { issuesContent } from "./content";

export function CurrentIssueSection() {
  const content = issuesContent.currentIssue;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={issuesContent.breadcrumb} />

        <div className="mt-6 sm:mt-8 grid grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] items-start gap-8 lg:gap-14 max-[1200px]:grid-cols-1 max-[1200px]:gap-10">
          <div
            className="group overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow,transform] duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#b6d1d3]"
            data-reveal
          >
            <div className="grid grid-cols-[minmax(0,340px)_minmax(0,1fr)] items-center gap-6 lg:gap-8 p-5 sm:p-6 max-[700px]:grid-cols-[120px_1fr] max-[700px]:gap-4 max-[700px]:p-4">
              <div className="relative h-[300px] lg:h-[390px] overflow-hidden rounded-lg max-[700px]:h-[170px]">
                <Image
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
                  src="/figma/journal-cover.webp"
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
                <Link
                  href="#"
                  className={`${button} w-fit max-[700px]:min-h-0 max-[700px]:px-2.5 max-[700px]:py-1.5 max-[700px]:text-[10px]`}
                >
                  {content.viewIssueButton}
                </Link>
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
                href="#"
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

export function IssueArticlesSection() {
  const content = issuesContent.articles;

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className={shell}>
        <h2
          className="mb-8 sm:mb-10 text-2xl sm:text-[32px] font-bold leading-tight uppercase text-[#0c0c0c]"
          data-reveal
        >
          {content.title}
        </h2>
        <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.items.map((article) => (
            <article
              className="group flex flex-col overflow-hidden rounded-lg border border-[#e3e9eb] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:shadow-[0_18px_30px_-24px_rgba(0,0,0,0.25)] motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#a9cacc]"
              key={article.title}
              data-reveal-item
            >
              <div className="relative h-[170px] shrink-0 overflow-hidden max-[700px]:h-[200px]">
                <Image
                  className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
                  src={`/figma/${article.image}`}
                  alt={article.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 306px"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <span className="mb-3 inline-block w-fit rounded-md bg-[#e9eef1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] leading-4 text-[#3f4b5b]">
                  {article.tag}
                </span>
                <h3 className="mb-2 text-base leading-snug font-semibold text-[#0c0c0c]">
                  <Link
                    className="rounded-sm transition-colors duration-300 group-hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
                    href={article.href}
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5c5c]">
                  {article.authors}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eef1f3] pt-3 text-xs sm:text-sm">
                  <time className="text-[#8d8d8d]">{article.date}</time>
                  <a
                    className="flex items-center gap-1.5 rounded-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
                    href={article.href}
                    aria-label={`Download ${article.title} as ${article.format}`}
                  >
                    {article.format}
                    <Image
                      className="size-4 sm:size-[18px]"
                      src="/figma/download.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </a>
                </div>
              </div>
            </article>
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
