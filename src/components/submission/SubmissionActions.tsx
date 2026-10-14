"use client";

import Link from "next/link";
import { useOjsSession } from "@/components/auth/useOjsSession";
import { button, outlineButton } from "@/components/landing/styles";
import { ojsLinks } from "@/lib/links";
import { submissionContent } from "./content";

/**
 * Hero buttons: login/register for visitors, or straight into OJS once signed
 * in. Still checking reads as signed out, as in the header.
 */
export function SubmissionActions() {
  const content = submissionContent.hero;
  const session = useOjsSession();
  const signedIn = session.status === "signedIn" ? session : null;

  const primary = signedIn
    ? { href: ojsLinks.newSubmission, label: content.newSubmission }
    : content.login;
  // Readers have no OJS dashboard, so they only get the submit button.
  const secondary = signedIn
    ? signedIn.links.dashboard && { href: signedIn.links.dashboard, label: content.dashboard }
    : content.register;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 max-[700px]:flex-col max-[700px]:items-stretch">
      <Link href={primary.href} className={button}>
        {primary.label}
      </Link>
      {secondary && (
        <>
          <span className="text-sm text-[#5c6b73] max-[700px]:text-center">
            {content.separator}
          </span>
          <Link href={secondary.href} className={`${button} ${outlineButton}`}>
            {secondary.label}
          </Link>
        </>
      )}
    </div>
  );
}
