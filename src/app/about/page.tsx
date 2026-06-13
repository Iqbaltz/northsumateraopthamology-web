import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { RichText } from "@/components/RichText";
import { getContext } from "@/lib/ojs";
import { localize } from "@/lib/ojs/localize";
import { ojsLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "About",
  description: "About North Sumatra Ophthalmology — scope, policies, and contact.",
};

export default async function AboutPage() {
  const context = await getContext();
  const name = localize(context.name) || "North Sumatra Ophthalmology";
  const description = localize(context.description);

  const facts = [
    { label: "Online ISSN", value: context.onlineIssn },
    { label: "Print ISSN", value: context.printIssn },
    { label: "Publisher", value: context.publisherInstitution },
    { label: "Contact", value: context.contactEmail },
  ].filter((f) => f.value);

  return (
    <>
      <section className="bg-paper">
        <Container className="py-16 lg:py-20">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">About</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-dark">{name}</h1>
          {description && (
            <RichText html={description} className="mt-5 max-w-3xl text-lg text-slate" />
          )}
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6 text-base leading-relaxed text-ink">
            <p>
              {name} is a peer-reviewed, open-access journal publishing original
              research, reviews, and case reports across ophthalmology and vision
              science. All submissions undergo editorial and peer review on the
              journal platform.
            </p>
            <p>
              Authors can register, submit manuscripts, and track the editorial
              process directly on the journal system. Published articles —
              including full-text PDFs, citation formats, and DOIs — are served
              there as well.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={ojsLinks.submit} variant="dark">
                Make a Submission
              </ButtonLink>
              <ButtonLink href={ojsLinks.editorialTeam} variant="outline">
                Editorial Team
              </ButtonLink>
              <ButtonLink href={ojsLinks.contact} variant="outline">
                Contact
              </ButtonLink>
            </div>
          </div>

          {facts.length > 0 && (
            <aside className="h-fit rounded-3xl border border-line bg-paper p-6">
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                Journal facts
              </h2>
              <dl className="mt-4 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium text-dark">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
}
