import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EditorialOfficeCard } from "@/components/EditorialOfficeCard";
import { button, kicker, outlineButton, shell, textLink } from "@/components/landing/styles";
import { submissionAnchors, submissionContent } from "./content";

const sectionTitleClass = "text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]";
const proseClass = "text-base leading-[25px] text-[#4a4a4a]";
const cardTextClass = "text-sm leading-6 text-[#4a4a4a]";
/** Sections below the hero are hash-link targets; keep their heading off the viewport edge. */
const anchorSectionClass = "scroll-mt-6 bg-white pb-14 sm:pb-20";

function SectionIntro({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[1000px]" data-reveal>
      {label && <p className={`${kicker} mb-2.5`}>{label}</p>}
      <h2 className={sectionTitleClass}>{title}</h2>
      {description && <p className={`mt-4 ${proseClass}`}>{description}</p>}
    </div>
  );
}

function CaretLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link className={`${textLink} ${className}`} href={href}>
      {label}
      <Image className="size-4" src="/figma/caret-right.svg" alt="" width={16} height={16} />
    </Link>
  );
}

export function SubmissionHeroSection() {
  const content = submissionContent.hero;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={submissionContent.breadcrumb} />

        <div className="mt-10 sm:mt-14 max-w-[1000px]" data-reveal>
          <h1 className="text-[32px] sm:text-[44px] font-bold leading-tight text-[#0c0c0c]">
            {content.title}
          </h1>
          <p className={`mt-4 sm:mt-5 ${proseClass}`}>{content.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 max-[700px]:flex-col max-[700px]:items-stretch">
            <Link href={content.login.href} className={button}>
              {content.login.label}
            </Link>
            <span className="text-sm text-[#5c6b73] max-[700px]:text-center">
              {content.separator}
            </span>
            <Link href={content.register.href} className={`${button} ${outlineButton}`}>
              {content.register.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeforeYouSubmitSection() {
  const content = submissionContent.beforeSubmit;

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className={shell}>
        <SectionIntro title={content.title} description={content.description} />

        <ol className="mt-8 sm:mt-10 grid gap-3">
          {content.steps.map((step, index) => (
            <li key={step.title} data-reveal-item>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-3 rounded-lg border border-[#e3eaef] bg-white px-5 py-4 sm:px-6 sm:py-5 transition-[border-color,box-shadow] duration-300 hover:border-[#b6d1d3] hover:shadow-[0_14px_28px_-24px_rgba(0,0,0,0.3)] max-[700px]:grid-cols-[auto_minmax(0,1fr)] max-[700px]:items-start max-[700px]:gap-x-4">
                <span
                  aria-hidden
                  className="grid size-8 sm:size-9 place-items-center rounded-full bg-[#07868f] text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-[#0c0c0c]">
                    {step.title}
                  </h3>
                  <p className={`mt-1 ${cardTextClass}`}>{step.text}</p>
                </div>
                {step.link && (
                  <CaretLink
                    href={step.link.href}
                    label={step.link.label}
                    className="justify-self-end text-sm max-[700px]:col-start-2 max-[700px]:justify-self-start"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AuthorResourcesSection() {
  const content = submissionContent.resources;

  return (
    <section id={submissionAnchors.resources} className={anchorSectionClass}>
      <div className={shell}>
        <SectionIntro title={content.title} description={content.description} />

        <ul className="mt-8 sm:mt-10 grid grid-cols-4 gap-5 lg:gap-6 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.items.map((resource) => (
            <li key={resource.title} className="flex" data-reveal-item>
              <div className="flex flex-1 flex-col rounded-lg border border-[#e3eaef] bg-white p-5 sm:p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-[#b6d1d3] hover:shadow-[0_18px_30px_-24px_rgba(0,0,0,0.25)] motion-safe:hover:-translate-y-1">
                <h3 className="text-base sm:text-lg font-bold leading-snug text-[#0c0c0c]">
                  {resource.title}
                </h3>
                <p className={`mt-2 ${cardTextClass}`}>{resource.text}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <Image
                    className="size-9 shrink-0"
                    src="/figma/file-doc.svg"
                    alt=""
                    width={36}
                    height={36}
                  />
                  <a
                    className="flex items-center gap-1.5 rounded-sm text-sm font-bold text-[#07868f] transition-colors duration-300 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [&_img]:transition-transform [&_img]:duration-300 motion-safe:hover:[&_img]:translate-y-0.5"
                    href={resource.href}
                    aria-label={`${content.downloadLabel} ${resource.title}`}
                  >
                    {content.downloadLabel}
                    <Image
                      className="size-[18px]"
                      src="/figma/download.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ArticleTypesSection() {
  const content = submissionContent.articleTypes;

  return (
    <section id={submissionAnchors.articleTypes} className={anchorSectionClass}>
      <div className={shell}>
        <SectionIntro label={content.kicker} title={content.title} description={content.description} />

        <ul className="mt-8 sm:mt-10 grid grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-10 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.items.map((type) => (
            <li key={type.title} data-reveal-item>
              <div className="group h-full border-t border-[#d5e0e2] pt-5 transition-colors duration-300 hover:border-[#07868f]">
                <h3 className="text-lg sm:text-xl font-bold leading-snug text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                  {type.title}
                </h3>
                <p className={`mt-2 ${cardTextClass}`}>{type.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RequiredFilesSection() {
  const content = submissionContent.requiredFiles;
  // Numbered down the first column, then the second, as two independent stacks.
  const half = Math.ceil(content.items.length / 2);
  const columns = [content.items.slice(0, half), content.items.slice(half)];

  return (
    <section id={submissionAnchors.requiredFiles} className={anchorSectionClass}>
      <div className={shell}>
        <SectionIntro label={content.kicker} title={content.title} description={content.description} />

        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 max-[700px]:grid-cols-1">
          {columns.map((column, columnIndex) => (
            <ol key={columnIndex} className="grid content-start gap-8">
              {column.map((file, index) => (
                <li key={file.title} data-reveal-item>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug text-[#07868f]">
                    {String(columnIndex * half + index + 1).padStart(2, "0")}. {file.title}
                  </h3>
                  <p className={`mt-2 ${cardTextClass}`}>{file.text}</p>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManuscriptPreparationSection() {
  const content = submissionContent.preparation;

  return (
    <section id={submissionAnchors.preparation} className={anchorSectionClass}>
      <div className={shell}>
        <SectionIntro label={content.kicker} title={content.title} description={content.description} />

        <div className="mt-8 sm:mt-10 grid max-w-[1000px] gap-6 sm:gap-7">
          {content.items.map((item) => (
            <div key={item.title} data-reveal-item>
              <h3 className="text-lg sm:text-xl font-bold leading-snug text-[#07868f]">
                {item.title}
              </h3>
              {"flow" in item ? (
                <ol className={`mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 ${proseClass}`}>
                  {item.flow.map((part, index) => (
                    <li key={part} className="flex items-center gap-2">
                      {index > 0 && (
                        <span aria-hidden className="text-[#07868f]">
                          →
                        </span>
                      )}
                      {part}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={`mt-2 ${proseClass}`}>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowToSubmitSection() {
  const content = submissionContent.howToSubmit;

  return (
    <section id={submissionAnchors.howToSubmit} className={anchorSectionClass}>
      <div className={shell}>
        <SectionIntro title={content.title} />

        <ol className="mt-8 sm:mt-10 grid grid-cols-4 gap-5 lg:gap-6 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.stages.map((stage, index) => (
            <li key={stage.title} className="flex" data-reveal-item>
              <div className="flex min-h-[260px] flex-1 flex-col rounded-xl border border-transparent bg-[#f4f7f8] p-6 sm:p-7 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-[#d5e0e2] hover:bg-white hover:shadow-[0_18px_35px_-24px_rgba(0,0,0,0.28)] motion-safe:hover:-translate-y-1 max-[700px]:min-h-0">
                <h3 className="text-lg sm:text-xl font-bold leading-snug text-[#0c0c0c]">
                  {stage.title}
                </h3>
                <p className={`mt-3 ${cardTextClass}`}>{stage.text}</p>
                <span
                  aria-hidden
                  className="mt-auto pt-8 text-[44px] font-bold leading-none text-[#07868f]"
                >
                  {index + 1}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-6 text-[#5c6b73]" data-reveal>
          {content.note}
        </p>
      </div>
    </section>
  );
}

export function AuthorFeesSection() {
  const content = submissionContent.fees;

  return (
    <section id={submissionAnchors.fees} className={anchorSectionClass}>
      <div className={shell}>
        <div className="max-w-[1000px]" data-reveal>
          <h2 className={sectionTitleClass}>{content.title}</h2>
          <p className={`mt-4 ${proseClass}`}>{content.intro}</p>
          <dl className="mt-5 grid gap-5">
            {content.items.map((fee) => (
              <div key={fee.label}>
                <dt className="text-base font-bold text-[#0c0c0c]">
                  {fee.label}: {fee.amount}
                </dt>
                <dd className={`mt-1 ${proseClass}`}>{fee.text}</dd>
              </div>
            ))}
          </dl>
          <p className={`mt-5 ${proseClass}`}>{content.waiver}</p>
        </div>
      </div>
    </section>
  );
}

function PolicySection({
  id,
  title,
  paragraphs,
  link,
}: {
  id: string;
  title: string;
  paragraphs: string[];
  link: { label: string; href: string };
}) {
  return (
    <section id={id} className={anchorSectionClass}>
      <div className={shell}>
        <div className="max-w-[1000px]" data-reveal>
          <h2 className={sectionTitleClass}>{title}</h2>
          <div className="mt-4 grid gap-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={proseClass}>
                {paragraph}
              </p>
            ))}
          </div>
          <CaretLink href={link.href} label={link.label} className="mt-5 text-sm" />
        </div>
      </div>
    </section>
  );
}

export function PrivacySection() {
  const content = submissionContent.privacy;
  return <PolicySection id={submissionAnchors.privacy} {...content} />;
}

export function CopyrightSection() {
  const content = submissionContent.copyright;
  return <PolicySection id={submissionAnchors.copyright} {...content} />;
}

export function SubmissionHelpSection() {
  const content = submissionContent.help;

  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className={shell}>
        <EditorialOfficeCard title={content.title} text={content.text} cta={content.cta} />
      </div>
    </section>
  );
}
