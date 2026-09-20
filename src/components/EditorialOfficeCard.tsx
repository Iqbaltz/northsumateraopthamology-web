import Image from "next/image";
import { Envelope } from "@/components/icons";
import { journal } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { button } from "@/components/landing/styles";
import { ojsLinks } from "@/lib/links";

const contactLinkClass =
  "flex items-center gap-2 whitespace-nowrap rounded-sm transition-colors duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]";

/**
 * Call-to-action card for reaching the editorial office, with the office address,
 * WhatsApp and email underneath. Shared by the submission and editorial board pages.
 */
export function EditorialOfficeCard({
  title,
  text,
  cta,
  withIcon = false,
}: {
  title: string;
  text: string;
  cta: string;
  /** Prefix the call to action with an envelope. */
  withIcon?: boolean;
}) {
  const contact = landingContent.header;
  const whatsappNumber = contact.whatsapp.replace(/\D/g, "");

  return (
    <div
      className="overflow-hidden rounded-xl border border-[#d5e0e2] bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)]"
      data-reveal
    >
      <div className="flex items-center justify-between gap-6 bg-[linear-gradient(198deg,#fdfdfe_0%,#f1f5f6_100%)] p-6 sm:p-8 max-[700px]:flex-col max-[700px]:items-start">
        <div className="max-w-[760px]">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight text-[#0c0c0c]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#4a4a4a] sm:text-base sm:leading-[25px]">
            {text}
          </p>
        </div>
        <a
          href={ojsLinks.contact}
          className={`${button} shrink-0 gap-2.5 text-sm tracking-[0.04em] uppercase`}
        >
          {withIcon && <Envelope className="size-[18px]" />}
          {cta}
        </a>
      </div>

      <div className="flex items-center justify-between gap-x-8 gap-y-4 border-t border-[#e3eaef] px-6 py-4 sm:px-8 sm:py-5 max-[1200px]:flex-col max-[1200px]:items-start">
        <div>
          <p className="text-sm font-bold text-[#07868f]">JONSON – {journal.title}</p>
          <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-[#5c6b73]">
            {landingContent.footer.address}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#0c0c0c]">
          <a
            className={contactLinkClass}
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/figma/whatsapp.svg" alt="" width={20} height={20} />
            {contact.whatsapp}
          </a>
          <a className={contactLinkClass} href={`mailto:${contact.email}`}>
            <Image src="/figma/envelope.svg" alt="" width={20} height={20} />
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
