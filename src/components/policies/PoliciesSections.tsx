import Image from "next/image";
import Link from "next/link";
import { shell, textLink } from "@/components/landing/styles";
import { PageHero } from "@/components/PageHero";
import { policiesContent } from "./content";

export function PoliciesHeroSection() {
  const content = policiesContent.hero;
  return (
    <PageHero
      breadcrumb={policiesContent.breadcrumb}
      title={content.title}
      description={content.description}
    />
  );
}

export function PolicySectionsList() {
  return (
    <div className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      {/* Policy text reads in a narrower column than the page shell. */}
      <div className={`${shell} grid gap-14 sm:gap-20`}>
        {policiesContent.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto w-full max-w-[1000px] scroll-mt-6"
            aria-labelledby={`${section.id}-title`}
            data-reveal
          >
            <h2
              id={`${section.id}-title`}
              className="text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]"
            >
              {section.title}
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-[26px] text-[#3f3f3f]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.link && (
              <Link className={`${textLink} mt-5 text-sm`} href={section.link.href}>
                {section.link.label}
                <Image className="size-4" src="/figma/caret-right.svg" alt="" width={16} height={16} />
              </Link>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
