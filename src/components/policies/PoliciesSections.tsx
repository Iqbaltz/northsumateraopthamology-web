import { Breadcrumb } from "@/components/Breadcrumb";
import { shell } from "@/components/landing/styles";
import { policiesContent } from "./content";

export function PoliciesHeroSection() {
  const content = policiesContent.hero;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={policiesContent.breadcrumb} />

        <div className="mt-8 sm:mt-10 max-w-[1100px]" data-reveal>
          <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
            {content.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base leading-[26px] text-[#3f3f3f]">{content.description}</p>
        </div>
      </div>
    </section>
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
          </section>
        ))}
      </div>
    </div>
  );
}
