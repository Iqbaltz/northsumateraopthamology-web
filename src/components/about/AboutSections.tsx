import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ScopeMark } from "@/components/icons";
import { journal } from "@/components/issues/journal";
import { button, kicker, shell } from "@/components/landing/styles";
import { aboutAnchors } from "./anchors";
import { aboutContent, type JournalFact } from "./content";

const sectionTitleClass = "text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]";
const proseClass = "text-base leading-[26px] text-[#3f3f3f]";
const tealLinkClass =
  "rounded-sm font-semibold text-[#07868f] underline-offset-2 transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]";
/** Sections below the hero are hash-link targets; keep their heading off the viewport edge. */
const anchorSectionClass = "scroll-mt-6 bg-white";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function SmartLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

/** Turns the first occurrence of `link.text` inside `text` into a link. */
function withLink(text: string, link: { text: string; href: string }) {
  const start = text.indexOf(link.text);
  if (start === -1) return text;
  return (
    <>
      {text.slice(0, start)}
      <SmartLink href={link.href} className={`${tealLinkClass} underline`}>
        {link.text}
      </SmartLink>
      {text.slice(start + link.text.length)}
    </>
  );
}

/** "Submit your journal with us" strip with the manuscript template download. */
function TemplateBanner({ inset = false, className = "" }: { inset?: boolean; className?: string }) {
  const content = aboutContent.templateBanner;
  const frame = inset
    ? "border-t border-[#d5e0e2] bg-white px-6 sm:px-10"
    : "rounded-lg border border-[#d5e0e2] bg-white px-5 sm:px-8 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.2)]";

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 sm:py-5 ${frame} ${className}`}
    >
      <span className="flex items-center gap-3 sm:gap-5 text-sm font-medium text-[#3f3f3f]">
        <Image
          className="size-9 sm:size-11 shrink-0"
          src="/figma/file-doc.svg"
          alt=""
          width={44}
          height={44}
        />
        {content.text}
      </span>
      <a
        className="flex items-center gap-1.5 rounded-sm text-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
        href={content.href}
      >
        {content.download}
        <Image className="size-[18px] sm:size-5" src="/figma/download.svg" alt="" width={20} height={20} />
      </a>
    </div>
  );
}

export function AboutHeroSection() {
  const content = aboutContent.hero;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={aboutContent.breadcrumb} />

        <div className="mt-8 sm:mt-10 grid grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] items-center gap-10 lg:gap-16 max-[1200px]:grid-cols-[minmax(0,1fr)_220px] max-[700px]:grid-cols-1">
          <div data-reveal>
            <h1 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.1] text-[#0c0c0c]">
              {content.title}
            </h1>
            <p className={`mt-5 ${proseClass}`}>
              <strong className="font-bold uppercase text-[#0c0c0c]">{content.journalName}</strong> (
              {/* An ISSN must not wrap at its hyphen. */}
              {content.issnLabels.print}:{" "}
              <span className="whitespace-nowrap">{journal.issn.print}</span>, {content.issnLabels.online}:{" "}
              <span className="whitespace-nowrap">{journal.issn.online}</span>) {content.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#d5e0e2] pt-7">
              <Link
                href={content.submit.href}
                className={`${button} !min-h-0 px-5 py-2.5 text-xs tracking-[0.04em]`}
              >
                {content.submit.label}
              </Link>
              <small className="text-xs leading-tight text-[#666]">
                {journal.issnOnline}
                <br />
                {journal.issnPrint}
              </small>
            </div>
          </div>

          <div
            className="relative mx-auto aspect-[878/1024] w-full max-w-[340px] max-[700px]:max-w-[230px]"
            data-reveal
            data-reveal-delay="120"
          >
            <Image
              className="object-contain drop-shadow-[0_24px_30px_rgba(12,44,48,0.18)]"
              src={`/figma/${journal.cover}`}
              alt={content.coverAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 700px) 230px, (max-width: 1200px) 220px, 340px"
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12" data-reveal>
          <TemplateBanner />
        </div>
      </div>
    </section>
  );
}

export function AimsScopeSection() {
  const content = aboutContent.aimsScope;

  return (
    <section id={aboutAnchors.aimsScope} className={`${anchorSectionClass} py-14 sm:py-20`}>
      <div className={shell}>
        <div data-reveal>
          <p className={kicker}>{content.kicker}</p>
          <h2 className={`mt-2.5 ${sectionTitleClass}`}>{content.title}</h2>
          <p className={`mt-4 ${proseClass}`}>{content.description}</p>
        </div>

        <div className="mt-8 border-t border-[#e3eaef] pt-8" data-reveal>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#07868f]">
            {content.aimTitle}
          </h3>
          <p className={`mt-3 ${proseClass}`}>{content.aim}</p>
        </div>

        <div className="mt-8" data-reveal>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#07868f]">
            {content.scopeTitle}
          </h3>
          <p className={`mt-3 ${proseClass}`}>{content.scopeIntro}</p>
        </div>

        <ul className="mt-6 grid grid-cols-3 gap-4 lg:gap-5 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.areas.map((area) => (
            <li key={area.title} className="flex" data-reveal-item>
              <div className="flex flex-1 items-center gap-4 rounded-lg border border-[#e3eaef] bg-white p-5 sm:p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#b6d1d3] hover:shadow-[0_14px_28px_-24px_rgba(0,0,0,0.3)]">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eef6f6] text-[#07868f]">
                  <ScopeMark className="size-7" />
                </span>
                <div>
                  <h4 className="text-base font-bold leading-snug text-[#0c0c0c]">{area.title}</h4>
                  <p className="mt-1.5 text-sm leading-6 text-[#4a4a4a]">{area.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FactValue({ fact }: { fact: JournalFact }) {
  if (!fact.href) return fact.value;
  return (
    <SmartLink href={fact.href} className={tealLinkClass}>
      {fact.value}
    </SmartLink>
  );
}

export function JournalInformationSection() {
  const content = aboutContent.information;

  return (
    <section id={aboutAnchors.information} className={`${anchorSectionClass} pb-14 sm:pb-20`}>
      <div className={shell}>
        <div
          className="overflow-hidden rounded-xl border border-[#d5e0e2] bg-[linear-gradient(198deg,#fdfdfe_0%,#f6f9fa_100%)] shadow-[0_12px_24px_-15px_rgba(0,0,0,0.12)]"
          data-reveal
        >
          <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-8 lg:gap-14 p-6 sm:p-10 max-[1200px]:grid-cols-[200px_minmax(0,1fr)] max-[700px]:grid-cols-1 max-[700px]:p-5">
            <div className="relative mx-auto aspect-[878/1024] w-full max-w-[420px] max-[700px]:max-w-[200px]">
              <Image
                className="object-contain drop-shadow-[0_24px_30px_rgba(12,44,48,0.16)]"
                src={`/figma/${journal.cover}`}
                alt={content.coverAlt}
                fill
                sizes="(max-width: 700px) 200px, (max-width: 1200px) 200px, 420px"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]">
                {content.title}
              </h2>
              <dl className="mt-6 divide-y divide-[#e6edef] border-y border-[#e6edef]">
                {content.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 py-3"
                  >
                    <dt className="text-sm text-[#5c6b73]">{fact.label}</dt>
                    <dd className="ml-auto text-right text-sm font-semibold text-[#0c0c0c] max-[700px]:ml-0 max-[700px]:w-full max-[700px]:text-left">
                      <FactValue fact={fact} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <TemplateBanner inset />
        </div>
      </div>
    </section>
  );
}

function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${anchorSectionClass} pb-12 sm:pb-16`}>
      <div className={shell}>
        <div data-reveal>
          <h2 className={sectionTitleClass}>{title}</h2>
          <div className={`mt-4 grid gap-4 ${proseClass}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function AboutPoliciesSections() {
  const { peerReview, openAccess, archiving, copyright } = aboutContent.policies;

  return (
    <>
      <PolicySection id={aboutAnchors.peerReview} title={peerReview.title}>
        {peerReview.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PolicySection>
      <PolicySection id={aboutAnchors.openAccess} title={openAccess.title}>
        {openAccess.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PolicySection>
      <PolicySection id={aboutAnchors.archiving} title={archiving.title}>
        <p>{withLink(archiving.paragraph, archiving.link)}</p>
      </PolicySection>
      <PolicySection id={aboutAnchors.copyright} title={copyright.title}>
        <p>{withLink(copyright.paragraph, copyright.link)}</p>
      </PolicySection>
    </>
  );
}
