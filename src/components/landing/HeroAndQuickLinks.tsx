import Image from "next/image";
import Link from "next/link";
import { ojsLinks } from "@/lib/links";
import { landingContent, type QuickLink } from "./content";
import { button, outlineButton, shell } from "./styles";

export function HeroSection() {
  const content = landingContent.hero;
  return (
    <section className="relative min-h-[580px] bg-[linear-gradient(130deg,#fff_1%,#eff4f7_61%)] py-16 sm:py-20 lg:py-24 max-[1200px]:min-h-[540px] max-[700px]:min-h-0 max-[700px]:pt-16 max-[700px]:pb-40 max-[700px]:bg-[linear-gradient(145deg,rgba(255,254,255,1)_0%,rgba(239,244,247,1)_74%)]">
      <Image
        className="z-0 object-cover object-center motion-safe:animate-hero-settle max-[1200px]:object-[60%_center] max-[700px]:hidden"
        src="/figma/hero-eye.webp"
        alt={content.heroEyeAlt}
        fill
        priority
        sizes="100vw"
      />
      <div
        className={`${shell} relative z-[2] flex h-full flex-col items-start justify-center max-[1200px]:justify-start`}
      >
        <p
          className="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-[32px] leading-tight font-semibold text-[#0c0c0c] motion-safe:animate-hero-fade-up animate-delay-100"
        >
          {content.kicker}
        </p>
        <h1
          className="mb-6 sm:mb-8 max-w-[745px] font-serif text-[36px] sm:text-[40px] lg:text-[60px] leading-[1.15] font-semibold uppercase max-[1200px]:max-w-[480px] max-[1200px]:normal-case max-[700px]:max-w-full text-[#0c0c0c] motion-safe:animate-hero-fade-up animate-delay-200"
        >
          {content.title}
        </h1>
        <p
          className="mb-6 sm:mb-8 max-w-[558px] text-base sm:text-lg leading-relaxed font-normal text-[#0c0c0c] max-[1200px]:max-w-[420px] max-[700px]:max-w-full motion-safe:animate-hero-fade-up animate-delay-300"
        >
          {content.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 max-[700px]:w-[208px] max-[700px]:flex-col motion-safe:animate-hero-fade-up animate-delay-400">
          <a href={ojsLinks.submit} className={`${button} max-[700px]:w-full`}>
            {content.submitButton}
          </a>
          <Link href="#" className={`${button} ${outlineButton} max-[700px]:w-[208px]`}>
            {content.viewIssueButton}
          </Link>
        </div>
      </div>
    </section>
  );
}

const quickLinkDelayClasses = [
  "animate-delay-500",
  "animate-delay-600",
  "animate-delay-700",
  "animate-delay-800",
];

export function QuickLinksSection() {
  const links = landingContent.quickLinks;
  const row1 = links.slice(0, 2);
  const row2 = links.slice(2, 4);

  return (
    <section className="relative z-10">
      <div
        className={`${shell} -mt-16 md:-mt-20 lg:-mt-8 overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-[0_24px_45px_-30px_rgb(0_0_0/0.12)] motion-safe:animate-quicklinks-enter animate-delay-450`}
      >
        {/* Desktop Layout (>1200px: 4 items in 1 row) */}
        <div className="hidden min-[1201px]:grid min-[1201px]:grid-cols-4 min-[1201px]:items-center min-[1201px]:p-8 min-[1201px]:divide-x min-[1201px]:divide-[#e3eaef]">
          {links.map((item, index) => (
            <div key={item.title} className="px-6 first:pl-0 last:pr-0">
              <QuickLinkItem item={item} delayClass={quickLinkDelayClasses[index]} />
            </div>
          ))}
        </div>

        {/* Tablet / 2x2 Layout (701px - 1200px: continuous horizontal line & 2 inset vertical dividers) */}
        <div className="hidden min-[701px]:max-[1200px]:flex min-[701px]:max-[1200px]:flex-col">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-6 sm:p-8">
            <QuickLinkItem item={row1[0]} delayClass={quickLinkDelayClasses[0]} />
            <div className="mx-6 h-16 w-px shrink-0 bg-[#e3eaef] sm:mx-8" />
            <QuickLinkItem item={row1[1]} delayClass={quickLinkDelayClasses[1]} />
          </div>

          {/* Full-width continuous horizontal separator */}
          <div className="h-px w-full bg-[#e3eaef]" />

          {/* Row 2 */}
          <div className="flex items-center justify-between p-6 sm:p-8">
            <QuickLinkItem item={row2[0]} delayClass={quickLinkDelayClasses[2]} />
            <div className="mx-6 h-16 w-px shrink-0 bg-[#e3eaef] sm:mx-8" />
            <QuickLinkItem item={row2[1]} delayClass={quickLinkDelayClasses[3]} />
          </div>
        </div>

        {/* Mobile Layout (<=700px: stacked 1 column) */}
        <div className="flex flex-col divide-y divide-[#e3eaef] p-5 min-[701px]:hidden">
          {links.map((item, index) => (
            <div key={item.title} className="py-4 first:pt-0 last:pb-0">
              <QuickLinkItem item={item} delayClass={quickLinkDelayClasses[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinkItem({ item, delayClass }: { item: QuickLink; delayClass?: string }) {
  return (
    <Link
      href={item.href}
      className={`group flex min-w-0 flex-1 items-center gap-4 sm:gap-6 transition-[background-color,transform] duration-300 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:-translate-y-0.5 motion-safe:animate-quicklink-item ${delayClass ?? ""}`}
    >
      <Image
        className="size-16 sm:size-20 shrink-0 object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:-rotate-1"
        src={`/figma/${item.image}`}
        alt={item.alt}
        width={80}
        height={80}
      />
      <span className="flex min-w-0 flex-col gap-1">
        <strong className="text-base sm:text-lg leading-snug font-semibold transition-colors duration-300 group-hover:text-[#07868f] text-[#0c0c0c]">
          {item.title}
        </strong>
        <small className="text-xs sm:text-sm leading-relaxed text-[#0c0c0c]">
          {item.text}
        </small>
      </span>
    </Link>
  );
}
