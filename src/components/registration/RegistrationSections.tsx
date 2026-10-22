import Image from "next/image";
import Link from "next/link";
import { ActivateForm } from "@/components/auth/ActivateForm";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EnvelopeCheck } from "@/components/icons";
import { button, shell } from "@/components/landing/styles";
import type { ActivationLink, ActivationStatus } from "@/lib/auth/registration";
import { activateContent, checkEmailContent, type NextStep } from "./content";

/** A whole-row link: title and line on the left, the teal call to action on the right. */
function NextStepCard({ step }: { step: NextStep }) {
  return (
    <li>
      <Link
        href={step.href}
        className="group flex items-center justify-between gap-6 rounded-lg border border-[#dfe5e8] bg-white px-5 py-4 transition-[border-color,box-shadow] duration-200 hover:border-[#a9cacc] hover:shadow-[0_12px_24px_-18px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] sm:px-6 sm:py-5 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3"
      >
        <span className="min-w-0">
          <span className="block text-base font-semibold leading-snug text-[#0c0c0c]">{step.title}</span>
          <span className="mt-1 block text-sm leading-6 text-[#4a4a4a]">{step.text}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.02em] text-[#07868f] transition-colors duration-200 group-hover:text-[#066e75] [&_img]:transition-transform [&_img]:duration-300 motion-safe:group-hover:[&_img]:translate-x-1">
          {step.cta}
          <Image className="size-4" src="/figma/caret-right.svg" alt="" width={16} height={16} />
        </span>
      </Link>
    </li>
  );
}

/**
 * Where a new account lands while OJS waits for the email address to be
 * confirmed. `email` is the address the confirmation went to, when known.
 */
export function CheckEmailSection({ email }: { email?: string }) {
  const content = checkEmailContent;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-16 sm:pb-24">
      <div className={shell}>
        <Breadcrumb items={content.breadcrumb} />

        <div className="mt-10 sm:mt-14" data-reveal>
          <EnvelopeCheck className="text-[#07868f]" />
          <h1 className="mt-6 font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.15] text-[#0c0c0c]">
            {content.title}
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-semibold leading-snug text-[#07868f]">
            {content.subtitle}
          </p>
          <p className="mt-5 max-w-[1000px] text-base leading-[26px] text-[#3f3f3f]">
            {content.intro.before}{" "}
            {email ? (
              <strong className="font-semibold text-[#0c0c0c] [overflow-wrap:anywhere]">{email}</strong>
            ) : (
              content.intro.fallbackAddress
            )}
            {content.intro.after}
          </p>
        </div>

        <ul className="mt-7 grid gap-3" data-reveal>
          {content.steps.map((step) => (
            <NextStepCard key={step.title} step={step} />
          ))}
        </ul>

        <p className="mt-7 text-base leading-[26px] text-[#3f3f3f]" data-reveal>
          {content.closing}
        </p>
      </div>
    </section>
  );
}

/**
 * The page the confirmation email's link opens. A pending link gets the Activate
 * Account button; any other gets what happened and a way forward.
 */
export function ActivateSection({
  link,
  status,
}: {
  link: ActivationLink;
  status: ActivationStatus;
}) {
  const content = activateContent;
  const outcome = status === "pending" ? null : content.outcomes[status];
  // On narrow screens the address wraps after the @ rather than mid-domain.
  const [mailbox, domain] = content.email.split("@");

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-16 sm:pb-24">
      <div className={shell}>
        <Breadcrumb items={content.breadcrumb} />

        <div className="mt-10 sm:mt-14" data-reveal>
          <h1 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.15] text-[#0c0c0c]">
            {outcome ? outcome.title : content.title}
          </h1>
          {outcome && (
            <p className="mt-4 max-w-[760px] text-base leading-[26px] text-[#3f3f3f]">{outcome.text}</p>
          )}

          <div className="mt-6">
            {outcome ? (
              <Link href={outcome.cta.href} className={`${button} uppercase`}>
                {outcome.cta.label}
              </Link>
            ) : (
              <ActivateForm link={link} label={content.submit} busyLabel={content.submitting} />
            )}
          </div>

          <p className="mt-7 text-base leading-[26px] text-[#3f3f3f]">
            {content.assistance}{" "}
            <a
              className="rounded-sm font-semibold text-[#07868f] [overflow-wrap:anywhere] transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
              href={`mailto:${content.email}`}
            >
              {mailbox}@<wbr />
              {domain}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
