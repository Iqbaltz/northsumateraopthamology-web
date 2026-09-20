import Image from "next/image";
import Link from "next/link";
import { authorLine, type IssueArticle } from "@/components/issues/journal";

/**
 * Cover tile for one article. Shared by issue tables of contents and an article's
 * similar-articles list; `meta` is the footnote beside the download link
 * (a publication date or a page range). Issue tables of contents pass
 * `withImage={false}` — they list text only.
 */
export function ArticleCard({
  article,
  meta,
  withImage = true,
}: {
  article: IssueArticle;
  meta: string;
  withImage?: boolean;
}) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-[#e3e9eb] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:shadow-[0_18px_30px_-24px_rgba(0,0,0,0.25)] motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#a9cacc]"
      data-reveal-item
    >
      {withImage && (
        <div className="relative h-[170px] shrink-0 overflow-hidden max-[700px]:h-[200px]">
          <Image
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
            src={`/figma/${article.image}`}
            alt={article.alt}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 306px"
          />
        </div>
      )}
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
          {authorLine(article.authors)}
        </p>
        {/* mt-auto lines footers up across a row of cards; pt-5 keeps the gap on the tallest */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-[#eef1f3] pt-3 text-xs sm:text-sm">
            <span className="text-[#8d8d8d]">{meta}</span>
            <a
              className="flex items-center gap-1.5 rounded-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
              href={article.downloadHref}
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
      </div>
    </article>
  );
}
