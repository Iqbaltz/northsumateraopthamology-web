import { Envelope, MapPin } from "@/components/icons";
import { landingContent } from "@/components/landing/content";
import { button, shell } from "@/components/landing/styles";
import { PageHero } from "@/components/PageHero";
import { contactContent } from "./content";

const inlineLinkClass =
  "rounded-sm text-[#07868f] underline-offset-2 transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]";

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
          {" or "}
          <a className={inlineLinkClass} href={officialSite.href2}>
            {officialSite.href2}
          </a>
          . {officialSite.suffix}
        </>
      }
    />
  );
}

export function ContactOfficeSection() {
  const office = contactContent.office;
  const { email } = landingContent.header;

  return (
    <div className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      <section
        className={`${shell} rounded-xl border border-[#d5e0e2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)] sm:p-8`}
        aria-labelledby="contact-office-title"
        data-reveal
      >
        <div className="flex items-center justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">
          <div>
            <h2
              id="contact-office-title"
              className="text-xl font-bold leading-snug text-[#0c0c0c] sm:text-2xl"
            >
              {office.title}
            </h2>
            {office.location && (
              <address className="mt-4 text-sm not-italic leading-6 text-[#3f3f3f] sm:text-base">
                {office.location.address}
              </address>
            )}
          </div>
          {office.location && (
            <a
              href={office.location.map.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button} shrink-0 gap-2.5 text-sm tracking-[0.04em] uppercase`}
            >
              <MapPin className="size-[18px]" />
              {office.location.map.label}
            </a>
          )}
        </div>

        <div className="mt-6 border-t border-[#e3eaef] pt-6">
          {/* A long address must wrap on a phone rather than push the button off-screen. */}
          <a
            href={`mailto:${email}`}
            className={`${button} gap-2.5 text-sm tracking-[0.04em] uppercase max-[700px]:w-full max-[700px]:whitespace-normal max-[700px]:text-left`}
          >
            <Envelope className="size-[18px] shrink-0" />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              <strong className="font-bold">{office.emailLabel}</strong>{" "}
              <span className="font-normal">{email}</span>
            </span>
          </a>
          <p className="mt-5 text-xs leading-5 text-[#4a4a4a] sm:text-sm">
            {office.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
