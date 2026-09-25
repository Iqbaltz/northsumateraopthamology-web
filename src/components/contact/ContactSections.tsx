import Image from "next/image";
import { MapPin, Phone } from "@/components/icons";
import { landingContent } from "@/components/landing/content";
import { button, shell } from "@/components/landing/styles";
import { PageHero } from "@/components/PageHero";
import { contactContent } from "./content";

const inlineLinkClass =
  "rounded-sm text-[#07868f] underline-offset-2 transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]";

const channelLinkClass =
  "flex items-center gap-2 rounded-sm text-[#07868f] transition-colors duration-200 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]";

export function ContactHeroSection() {
  const { title, officialSite } = contactContent.hero;
  return (
    <PageHero
      breadcrumb={contactContent.breadcrumb}
      title={title}
      description={
        <>
          {officialSite.prefix}{" "}
          <a className={inlineLinkClass} href={officialSite.href}>
            {officialSite.href}
          </a>
          . {officialSite.suffix}
        </>
      }
    />
  );
}

export function ContactOfficeSection() {
  const office = contactContent.office;
  const { whatsapp, email } = landingContent.header;
  const whatsappNumber = whatsapp.replace(/\D/g, "");
  const telephoneNumber = office.telephone.replace(/[^\d+]/g, "");

  return (
    <div className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      <section
        className={`${shell} rounded-xl border border-[#d5e0e2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)] sm:p-8`}
        aria-labelledby="contact-office-title"
        data-reveal
      >
        <div className="flex items-center justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <p className="text-base font-semibold text-[#0c0c0c] sm:text-lg">{office.kicker}</p>
            <h2
              id="contact-office-title"
              className="mt-1 text-2xl font-bold leading-tight text-[#0c0c0c] sm:text-[28px]"
            >
              {office.name}
            </h2>
            <address className="mt-4 text-sm not-italic leading-6 text-[#3f3f3f] sm:text-base">
              {office.address}
            </address>
          </div>
          <a
            href={office.map.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button} shrink-0 gap-2.5 text-sm tracking-[0.04em] uppercase`}
          >
            <MapPin className="size-[18px]" />
            {office.map.label}
          </a>
        </div>

        <div className="mt-6 border-t border-[#e3eaef] pt-6">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm font-semibold sm:text-base">
            <li>
              <a
                className={channelLinkClass}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/figma/whatsapp.svg" alt="" width={20} height={20} />
                {whatsapp}
              </a>
            </li>
            <li>
              <a className={channelLinkClass} href={`tel:${telephoneNumber}`}>
                <Phone />
                {office.telephone}
              </a>
            </li>
            <li>
              <a className={channelLinkClass} href={`mailto:${email}`}>
                <Image src="/figma/envelope.svg" alt="" width={20} height={20} />
                {email}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-xs leading-5 text-[#4a4a4a] sm:text-sm">{office.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
