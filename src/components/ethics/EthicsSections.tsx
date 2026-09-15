import { GuideNodeView } from "@/components/GuideNodeView";
import { shell } from "@/components/landing/styles";
import { PageHero } from "@/components/PageHero";
import { ethicsContent } from "./content";

export function EthicsHeroSection() {
  const content = ethicsContent.hero;
  return (
    <PageHero
      breadcrumb={ethicsContent.breadcrumb}
      title={content.title}
      description={content.description}
    />
  );
}

export function EthicsSectionsList() {
  return (
    <div className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      {/* Policy text reads in a narrower column than the page shell. */}
      <div className={`${shell} grid gap-14 sm:gap-20`}>
        {ethicsContent.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto w-full max-w-[1000px] scroll-mt-6"
            aria-labelledby={`${section.id}-title`}
          >
            <div data-reveal>
              <h2
                id={`${section.id}-title`}
                className="text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]"
              >
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="mt-1.5 text-sm text-[#5c6b73]">{section.subtitle}</p>
              )}
            </div>

            {/* Blocks reveal one by one: the R-W-C section is several screens tall. */}
            <div className="mt-6 grid gap-10">
              {section.blocks.map((block, index) => (
                <div key={block.id ?? index} id={block.id} className="scroll-mt-6" data-reveal>
                  {block.heading && (
                    <h3 className="mb-3 text-xl sm:text-[22px] font-bold leading-tight text-[#07868f]">
                      {block.heading}
                    </h3>
                  )}
                  {block.body.map((node, nodeIndex) => (
                    <GuideNodeView key={nodeIndex} node={node} size="base" />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
