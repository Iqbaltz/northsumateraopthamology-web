import Image from "next/image";
import Link from "next/link";
import { CreativeCommonsBadge } from "@/components/CreativeCommonsBadge";
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
  const social = content.social.filter((account) => account.href);
  const showContact = content.showAddress || social.length > 0;

  return (
    <footer className="mt-0 bg-[#f7f9fa] text-[#0c0c0c]">
      <div
        className={`${shell} grid grid-cols-[341px_1fr] gap-24 py-12 max-[1200px]:grid-cols-1 max-[1200px]:gap-[95px] max-[700px]:min-h-0 max-[700px]:gap-16`}
      >
        <div
          className="flex flex-col max-[1200px]:flex-row max-[1200px]:items-center max-[1200px]:justify-between max-[1200px]:gap-24 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-6"
          data-reveal
        >
          {/* Same lockup geometry as the desktop header logo. */}
          <div className="relative mb-6 h-[60px] w-[265px] shrink-0 max-[1200px]:mb-0">
            <Image
              className="absolute top-0 left-[139px] h-[60px] w-[86px]"
              src="/figma/logo-symbol.svg"
              alt=""
              width={86}
              height={60}
            />
            <Image
              className="absolute top-[13px] left-0 h-[34px] w-[265px]"
              src="/figma/logo-word.svg"
              alt="JONSON"
              width={265}
              height={34}
            />
          </div>
          {showContact && (
            <div className="flex flex-col gap-4 max-[1200px]:flex-1">
              {content.showAddress && <p className="text-base leading-[25px]">{content.address}</p>}
              {social.length > 0 && (
                <div className="flex gap-4">
                  {social.map(({ icon, label, href }) => (
                    <a
                      href={href}
                      key={icon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Official JONSON ${label}`}
                      className="rounded-full transition-[transform,opacity] duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:-translate-y-1"
                    >
                      <Image src={`/figma/${icon}`} alt={`${label} icon`} width={24} height={24} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* The link columns sit against the right edge, as in the design, until the footer stacks. */}
        <div className="grid w-full max-w-[640px] grid-cols-3 gap-4 justify-self-end sm:gap-6 lg:gap-8 max-[1200px]:max-w-none max-[1200px]:justify-self-stretch max-[700px]:grid-cols-2 max-[700px]:gap-x-[30px] max-[700px]:gap-y-12">
          {content.columns.map((column, index) => (
            <FooterColumn key={column.title} {...column} delay={index * 70} />
          ))}
        </div>
      </div>

      {indexingPartners.length > 0 && (
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
      )}

      <div
        className={`${shell} flex items-center justify-between gap-x-10 gap-y-4 border-t border-[#e3eaef] py-6 max-[700px]:flex-col max-[700px]:items-start`}
      >
        <p className="text-base leading-[27px] max-[700px]:text-sm max-[700px]:leading-6">
          <span className="uppercase">{content.license.journal}.</span> {content.license.statement}{" "}
          <a
            className="rounded-sm text-[#07868f] underline underline-offset-2 transition-colors duration-200 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
            href={content.license.href}
            target="_blank"
            rel="license noopener noreferrer"
          >
            {content.license.name}
          </a>{" "}
          (CC {content.license.badge}).
        </p>
        <CreativeCommonsBadge imageClassName="h-[46px] w-[131px]" />
      </div>

      <div className="flex min-h-10 items-center justify-between gap-5 bg-[#07868f] px-[max(20px,calc((100%_-_1320px)/2))] py-2 text-base leading-6 text-white max-[1200px]:px-[58px] max-[1200px]:text-[11px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:px-4 max-[700px]:text-[11px] max-[700px]:leading-5">
        <p>
          © {year} {content.copyright}
        </p>
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
