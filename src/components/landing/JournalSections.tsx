import Image from "next/image";
import Link from "next/link";
import { indexingPartners, landingContent } from "./content";
import { button, kicker, shell, textLink } from "./styles";

export function AboutJournalSection() {
  const content = landingContent.aboutJournal;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div
        className={`${shell} grid grid-cols-[470px_1fr] items-start gap-12 max-[1200px]:grid-cols-1 max-[1200px]:gap-16`}
      >
        <div className="w-full" data-reveal>
          <p className={kicker}>{content.kicker}</p>
          <h2 className="my-5 font-serif text-2xl sm:text-[32px] leading-tight font-semibold text-[#0c0c0c]">
            {content.title}
          </h2>
          <p className="mb-4 text-base leading-[25px] text-[#0c0c0c]">
            {content.p1}
          </p>
          <p className="mb-4 text-base leading-[25px] text-[#0c0c0c]">
            {content.p2}
          </p>
          <ul className="my-6 grid gap-3.5">
            {content.values.map((item, index) => (
              <li
                className="group/value flex items-center gap-3 text-base leading-[21px] transition-[color,transform] duration-300 hover:text-[#07868f] motion-safe:hover:translate-x-1"
                key={item}
                data-reveal-item
                data-reveal-delay={String(index * 90 + 60)}
              >
                <Image
                  className="size-8 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover/value:scale-110"
                  src="/figma/check.svg"
                  alt="Checkmark icon"
                  width={32}
                  height={32}
                />
                <span className="font-semibold text-[#0c0c0c]">
                  {item.split("–")[0]}
                  <span className="font-normal">–{item.split("–")[1]}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link className={textLink} href="#">
            {content.learnMore}{" "}
            <Image
              src="/figma/arrow-up-right.svg"
              alt="Arrow pointing up right"
              width={24}
              height={24}
            />
          </Link>
        </div>

        <div
          className="group overflow-hidden rounded-xl border border-[#d5e0e2] bg-[linear-gradient(198deg,#fdfdfe_0%,#f8fafb_100%)] shadow-[0_12px_24px_-15px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow,transform] duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#b6d1d3]"
          data-reveal
          data-reveal-delay="100"
        >
          <div className="grid min-h-[440px] grid-cols-[385px_1fr] max-[1200px]:grid-cols-[333px_1fr] items-center gap-6 sm:gap-8 p-6 sm:p-8 max-[700px]:grid-cols-[135px_1fr] max-[700px]:gap-3.5 max-[700px]:p-3.5 max-[700px]:min-h-0">
            <div className="relative h-[240px] sm:h-[389px] lg:h-[450px] overflow-hidden rounded-lg">
              <Image
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
                src="/figma/journal-cover.webp"
                alt={content.coverAlt}
                fill
                sizes="(max-width: 700px) 135px, (max-width: 1200px) 333px, 385px"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className={kicker}>{content.issueKicker}</p>
              <h3 className="mt-2 mb-1 font-sans text-xl sm:text-[32px] font-bold leading-tight whitespace-pre-line text-[#0c0c0c]">
                {content.volumeTitle}
              </h3>
              <h4 className="mb-2 text-base sm:text-2xl font-semibold leading-tight text-[#07868f]">
                {content.publishDate}
              </h4>
              <p className="mb-4 text-xs sm:text-base leading-relaxed text-[#0c0c0c]">
                {content.issueDescription}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <Link
                  href="#"
                  className={`${button} max-[700px]:px-2.5 max-[700px]:py-1.5 max-[700px]:text-[10px] max-[700px]:min-h-0 max-[700px]:w-fit`}
                >
                  {content.viewIssueButton}
                </Link>
                <small className="text-xs leading-tight text-[#666]">
                  {content.issnOnline}
                  <br />
                  {content.issnPrint}
                </small>
              </div>
            </div>
          </div>
          <div className="flex min-h-[64px] sm:min-h-[92px] items-center justify-between gap-4 border-t border-[#d5e0e2] bg-white px-6 sm:px-8 py-4 sm:py-5 max-[700px]:gap-2 max-[700px]:px-4 max-[700px]:py-3">
            <span className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#07868f]">
              <Image
                src="/figma/file-doc.svg"
                alt="Document icon"
                width={44}
                height={44}
                className="shrink-0 size-8 sm:size-11"
              />
              {content.submitBanner}
            </span>
            <a
              className="flex items-center gap-1.5 rounded-sm text-xs sm:text-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
              href="#"
            >
              {content.downloadTemplate}{" "}
              <Image
                src="/figma/download.svg"
                alt="Download icon"
                width={18}
                height={18}
                className="sm:size-6"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndexingSection() {
  const content = landingContent.indexing;

  return (
    <section className="bg-white py-12 max-[700px]:py-8">
      <div
        className={`${shell} flex min-h-[127px] items-center gap-8 rounded-xl border border-[#d5e0e2] bg-white p-8 shadow-[0_24px_45px_-30px_rgba(0,0,0,0.12)] max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-6 max-[700px]:min-h-[541px] max-[700px]:px-5 max-[700px]:py-8`}
        data-reveal
      >
        <strong className="shrink-0 font-sans text-sm uppercase tracking-wider font-bold text-[#0c0c0c] max-[1200px]:text-center">
          {content.title}
        </strong>
        <div className="flex w-full min-w-0 flex-1 items-center justify-around gap-7 max-[1200px]:flex-wrap max-[1200px]:justify-center max-[1200px]:gap-x-8 max-[1200px]:gap-y-6 max-[1200px]:max-w-[585px] max-[700px]:flex-col max-[700px]:gap-10">
          {indexingPartners.map((partner) => (
            <Image
              className="shrink-0 object-contain transition-[transform,filter,opacity] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.03]"
              key={partner.name}
              src={`/figma/${partner.image}`}
              alt={`Indeksasi JONSON pada ${partner.name}`}
              width={partner.width}
              height={partner.height}
              style={{
                width: `${partner.width}px`,
                height: `${partner.height}px`,
                maxWidth: "100%",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2.5 max-[1200px]:hidden">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-[#d0dbde] bg-white text-[#a8c0c2] transition-[transform,background-color,border-color,color] duration-300 hover:border-[#07868f] hover:bg-[#e8f4f4] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:-translate-x-0.5 motion-safe:active:scale-95"
            aria-label="Previous indexing partners"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border-2 border-[#07868f] bg-white text-[#07868f] transition-[transform,background-color,border-color,color] duration-300 hover:bg-[#07868f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:translate-x-0.5 motion-safe:active:scale-95"
            aria-label="Next indexing partners"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
