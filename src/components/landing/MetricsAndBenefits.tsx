import Image from "next/image";
import { landingContent } from "./content";
import { AnimatedMetric } from "./AnimatedMetric";
import { shell } from "./styles";

export function MetricsSection() {
  const content = landingContent.metrics;
  const items = content.items;

  return (
    <section id="journal-metrics" className="relative scroll-mt-8 min-h-[306px] bg-[linear-gradient(231deg,#ffffff_10%,#e9eceb_100%)] py-12 max-[700px]:min-h-[560px]">
      <div className={`${shell} relative z-[1]`}>
        <h2
          className="mb-8 sm:mb-10 text-2xl sm:text-[32px] font-bold leading-tight uppercase text-[#0c0c0c] max-[700px]:text-center"
          data-reveal
        >
          {content.title}
        </h2>

        {/* Desktop Layout (>1200px: 4 items in 1 row, max-w prevents overlapping right molecule graphic) */}
        <div
          className="hidden min-[1201px]:grid min-[1201px]:grid-cols-4 min-[1201px]:max-w-[760px] xl:min-[1201px]:max-w-[820px] min-[1201px]:items-center min-[1201px]:divide-x min-[1201px]:divide-[#aababc]"
          data-reveal
        >
          {items.map((metric) => (
            <div
              key={metric.label}
              className="group flex flex-col items-center justify-center px-4 py-2 text-center transition-transform duration-300 ease-out first:pl-0 last:pr-0 motion-safe:hover:-translate-y-1"
            >
              <AnimatedMetric value={metric.value} />
              <span className="mt-1 text-base leading-snug font-medium text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tablet Layout (701px - 1200px: 2x2 grid with vertical dividers, NO horizontal line, matching Gambar 1) */}
        <div
          className="hidden min-[701px]:max-[1200px]:flex min-[701px]:max-[1200px]:flex-col min-[701px]:max-[1200px]:w-[420px] sm:min-[701px]:max-[1200px]:w-[460px] min-[701px]:max-[1200px]:gap-8"
          data-reveal
        >
          {/* Row 1: Item 0 and Item 1 */}
          <div className="flex items-center justify-between">
            <div className="group flex flex-1 flex-col items-center justify-center px-4 text-center transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1">
              <AnimatedMetric value={items[0].value} />
              <span className="mt-1 text-sm sm:text-base leading-snug font-medium text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                {items[0].label}
              </span>
            </div>
            <div className="h-14 w-px shrink-0 bg-[#aababc]" />
            <div className="group flex flex-1 flex-col items-center justify-center px-4 text-center transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1">
              <AnimatedMetric value={items[1].value} />
              <span className="mt-1 text-sm sm:text-base leading-snug font-medium text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                {items[1].label}
              </span>
            </div>
          </div>

          {/* Row 2: Item 2 and Item 3 */}
          <div className="flex items-center justify-between">
            <div className="group flex flex-1 flex-col items-center justify-center px-4 text-center transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1">
              <AnimatedMetric value={items[2].value} />
              <span className="mt-1 text-sm sm:text-base leading-snug font-medium text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                {items[2].label}
              </span>
            </div>
            <div className="h-14 w-px shrink-0 bg-[#aababc]" />
            <div className="group flex flex-1 flex-col items-center justify-center px-4 text-center transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1">
              <AnimatedMetric value={items[3].value} />
              <span className="mt-1 text-sm sm:text-base leading-snug font-medium text-[#0c0c0c] transition-colors duration-300 group-hover:text-[#07868f]">
                {items[3].label}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Layout (<=700px: 1 column centered) */}
        <div
          className="mx-auto flex w-[220px] flex-col items-center gap-5 min-[701px]:hidden"
          data-reveal
        >
          {items.map((metric) => (
            <div
              key={metric.label}
              className="w-full border-b border-[#d5e0e2] pb-8 text-center last:border-b-0 last:pb-0"
            >
              <AnimatedMetric value={metric.value} />
              <span className="mt-1 block text-base leading-snug font-medium text-[#0c0c0c]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Image
        className="pointer-events-none absolute top-[-100px] right-[-60px] size-[460px] object-contain motion-safe:animate-ambient-float xl:top-[-110px] xl:right-[-20px] xl:size-[500px] max-[1200px]:top-[-110px] max-[1200px]:right-[-120px] max-[1200px]:size-[460px] max-[700px]:top-[350px] max-[700px]:right-[-100px] max-[700px]:size-[260px]"
        src="/figma/metrics-decoration.webp"
        alt={content.decorationAlt}
        width={500}
        height={500}
      />
    </section>
  );
}

export function BenefitsSection() {
  const content = landingContent.benefits;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={shell}>
        <h2 className="text-2xl sm:text-[32px] font-bold leading-tight uppercase text-[#0c0c0c] max-[700px]:text-center" data-reveal>
          {content.title}
        </h2>
        <div className="mt-8 sm:mt-10 grid grid-cols-4 gap-6 lg:gap-8 max-[1200px]:grid-cols-1 max-[1200px]:gap-8">
          {content.items.map((benefit) => (
            <div
              className="group border-r border-[#d5e0e2] px-6 sm:px-9 transition-transform duration-300 ease-out first:pl-0 last:border-r-0 last:pr-0 motion-safe:hover:-translate-y-1 max-[1200px]:flex max-[1200px]:flex-row max-[1200px]:items-center max-[1200px]:gap-6 max-[1200px]:border-r-0 max-[1200px]:border-b max-[1200px]:border-[#d5e0e2] max-[1200px]:px-0 max-[1200px]:pb-8 max-[1200px]:last:border-b-0 max-[1200px]:last:pb-0 [&:nth-child(2)]:delay-[60ms] [&:nth-child(3)]:delay-[120ms] [&:nth-child(4)]:delay-[180ms]"
              key={benefit.title}
              data-reveal-item
            >
              <div className="relative size-20 sm:size-28 lg:size-[120px] shrink-0 overflow-hidden">
                <Image
                  className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.035]"
                  src={`/figma/${benefit.image}`}
                  alt={benefit.alt}
                  fill
                  sizes="(max-width: 768px) 80px, 120px"
                />
              </div>
              <div>
                <h3 className="mb-1 text-lg sm:text-2xl font-bold leading-snug text-[#0c0c0c]">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-base leading-relaxed text-[#0c0c0c]">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
