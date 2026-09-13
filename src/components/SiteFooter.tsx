import Image from "next/image";
import Link from "next/link";
import { shell } from "@/components/landing/styles";
import {
  indexingPartners,
  landingContent,
  type FooterColumn as FooterColumnContent,
} from "@/components/landing/content";

/** Footer logos render smaller than the landing indexing strip. */
const PARTNER_LOGO_SCALE = 0.72;

export function SiteFooter() {
  const content = landingContent.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 bg-[#f7f9fa] text-[#0c0c0c]">
      <div
        className={`${shell} grid grid-cols-[341px_1fr] gap-24 py-12 max-[1200px]:grid-cols-1 max-[1200px]:gap-[95px] max-[700px]:min-h-0 max-[700px]:gap-16`}
      >
        <div
          className="flex flex-col max-[1200px]:flex-row max-[1200px]:items-center max-[1200px]:justify-between max-[1200px]:gap-24 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-6"
          data-reveal
        >
          <div className="relative mb-6 h-[42px] w-[185px] shrink-0 max-[1200px]:mb-0">
            <Image
              className="absolute top-0 left-[97px] h-[42px] w-[60px]"
              src="/figma/logo-symbol.svg"
              alt=""
              width={60}
              height={42}
            />
            <Image
              className="absolute top-[9px] left-0 h-6 w-[185px]"
              src="/figma/logo-word.svg"
              alt="JONSON"
              width={185}
              height={24}
            />
          </div>
          <div className="flex flex-col gap-4 max-[1200px]:flex-1">
            <p className="text-base leading-[25px]">{content.address}</p>
            <div className="flex gap-4">
              {[
                ["x.svg", "Twitter / X"],
                ["instagram.svg", "Instagram"],
                ["youtube.svg", "YouTube"],
                ["linkedin.svg", "LinkedIn"],
              ].map(([icon, label]) => (
                <a
                  href="#"
                  key={icon}
                  aria-label={`Official JONSON ${label}`}
                  className="rounded-full transition-[transform,opacity] duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:-translate-y-1"
                >
                  <Image src={`/figma/${icon}`} alt={`${label} icon`} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-[700px]:grid-cols-2 max-[700px]:gap-x-[30px] max-[700px]:gap-y-12">
          {content.columns.map((column, index) => (
            <FooterColumn key={column.title} {...column} delay={index * 70} />
          ))}
        </div>
      </div>

      <div className={`${shell} border-t border-[#e3eaef] py-8`}>
        <ul
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 max-[1200px]:justify-center max-[1200px]:gap-x-10"
          aria-label="Indexing partners"
        >
          {indexingPartners.map((partner) => (
            <li key={partner.name} className="shrink-0">
              {/* multiply drops the white matte some logo files ship with onto the tinted footer */}
              <Image
                className="object-contain mix-blend-multiply"
                src={`/figma/${partner.image}`}
                alt={`JONSON is indexed in ${partner.name}`}
                width={partner.width}
                height={partner.height}
                style={{
                  width: `${Math.round(partner.width * PARTNER_LOGO_SCALE)}px`,
                  height: `${Math.round(partner.height * PARTNER_LOGO_SCALE)}px`,
                  maxWidth: "100%",
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${shell} flex items-center justify-between gap-x-10 gap-y-4 border-t border-[#e3eaef] py-6 max-[700px]:flex-col max-[700px]:items-start`}
      >
        <p className="max-w-[960px] text-xs leading-5 text-[#4a4a4a]">
          <strong className="font-bold uppercase text-[#0c0c0c]">{content.license.journal}</strong>{" "}
          {content.license.statement} {content.license.prefix}{" "}
          <a
            className="rounded-sm font-semibold text-[#07868f] underline underline-offset-2 transition-colors duration-200 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
            href={content.license.href}
            target="_blank"
            rel="license noopener noreferrer"
          >
            {content.license.name}
          </a>
          .
        </p>
        <a
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#c9d3d7] bg-white px-2.5 py-1.5 text-[#0c0c0c] transition-[border-color,color] duration-200 hover:border-[#07868f] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
          href={content.license.href}
          target="_blank"
          rel="license noopener noreferrer"
          aria-label={content.license.name}
        >
          <CreativeCommonsIcons />
          <span className="text-[11px] font-bold tracking-[0.04em]">{content.license.badge}</span>
        </a>
      </div>

      <div className="flex min-h-10 items-center justify-between gap-5 bg-[#07868f] px-[max(20px,calc((100%_-_1320px)/2))] py-2 text-sm leading-6 text-white max-[1200px]:px-[58px] max-[1200px]:text-[11px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:px-4 max-[700px]:text-[11px] max-[700px]:leading-5">
        <p>
          © {year} {content.copyright}
        </p>
        <p className="font-bold">{content.hospital}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items, delay }: FooterColumnContent & { delay: number }) {
  return (
    <div data-reveal-item data-reveal-delay={String(delay)}>
      <h3 className="mb-4 text-sm sm:text-base leading-snug font-bold text-[#0c0c0c]">{title}</h3>
      <ul className="grid gap-1.5 text-xs sm:text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="inline-block rounded-sm transition-[color,transform] duration-300 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:translate-x-1"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The CC, BY (attribution) and SA (share-alike) marks, drawn with currentColor. */
function CreativeCommonsIcons() {
  const ring = { cx: 12, cy: 12, r: 10.25, fill: "none", stroke: "currentColor", strokeWidth: 1.6 };

  return (
    <span className="flex items-center gap-1" aria-hidden>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <path
          d="M10.8 10.2a2.55 2.55 0 1 0 0 3.6M16.8 10.2a2.55 2.55 0 1 0 0 3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <circle cx="12" cy="6.9" r="1.65" fill="currentColor" />
        <path d="M9.4 9.6h5.2v4.6h-1.4V18h-2.4v-3.8H9.4z" fill="currentColor" />
      </svg>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <path
          d="M7.6 12a4.4 4.4 0 1 1 1.3 3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M5.6 10.6h4l-2 2.6z" fill="currentColor" />
      </svg>
    </span>
  );
}
