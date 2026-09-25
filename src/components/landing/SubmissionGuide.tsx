"use client";

import Link from "next/link";
import { useState } from "react";
import { GuideNodeView } from "@/components/GuideNodeView";
import { Chevron } from "@/components/icons";
import { landingContent } from "./content";
import { button, kicker, shell } from "./styles";

export function SubmissionGuideSection() {
  const content = landingContent.submissionGuide;
  /** Index of the expanded panel, or null when every panel is collapsed. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    // Anchor target for the "For Authors" quick link.
    <section id="submission-guide" className="scroll-mt-8 bg-white pb-16 sm:pb-24">
      <div className={shell}>
        <div
          className="mb-8 sm:mb-10 flex flex-wrap items-start justify-between gap-4"
          data-reveal
        >
          <div>
            <p className={kicker}>{content.kicker}</p>
            <h2 className="mt-2.5 text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]">
              {content.title}
            </h2>
          </div>
          <Link
            href="/submission"
            className={`${button} shrink-0 !min-h-0 px-4 py-2.5 text-[11px] tracking-[0.04em] uppercase`}
          >
            {content.cta}
          </Link>
        </div>

        <div className="flex flex-col gap-2.5" data-reveal>
          {content.sections.map((section, index) => {
            const isOpen = openIndex === index;
            const panelId = `guide-panel-${index}`;

            return (
              <div
                key={section.title}
                className={`overflow-hidden rounded-lg border transition-colors duration-200 ${
                  isOpen ? "border-[#cfe0e2]" : "border-[#e3eaef]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 bg-[linear-gradient(180deg,#ffffff_0%,#f4f7f8_100%)] px-5 py-4 sm:px-6 text-left text-base sm:text-lg font-semibold transition-colors duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-inset ${
                      isOpen ? "text-[#07868f]" : "text-[#0c0c0c]"
                    }`}
                  >
                    {section.title}
                    <Chevron open={isOpen} className="size-5 text-current" />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-label={section.title}
                  className={`grid bg-white transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                    <div className="border-t border-[#e3eaef] px-5 py-5 sm:px-6 sm:py-6">
                      {section.blocks.length === 0 ? (
                        <p className="text-sm leading-relaxed text-[#8d8d8d] italic">
                          {content.placeholder}
                        </p>
                      ) : (
                        section.blocks.map((block, blockIndex) => (
                          <div key={blockIndex} className="mb-6 last:mb-0">
                            {block.heading && (
                              <h4 className="mb-2 text-base sm:text-lg font-bold leading-snug text-[#0c0c0c]">
                                {block.heading}
                              </h4>
                            )}
                            {block.body.map((node, nodeIndex) => (
                              <GuideNodeView key={nodeIndex} node={node} />
                            ))}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
