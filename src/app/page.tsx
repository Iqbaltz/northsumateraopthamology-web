import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { IssueCard } from "@/components/IssueCard";
import { ArticleCard } from "@/components/ArticleCard";
import { RichText } from "@/components/RichText";
import { getContext, getCurrentIssue, getIssues } from "@/lib/ojs";
import { localize } from "@/lib/ojs/localize";
import { ojsLinks } from "@/lib/links";

export default async function HomePage() {
  const [context, currentIssue, issues] = await Promise.all([
    getContext(),
    getCurrentIssue(),
    getIssues(),
  ]);

  const journalName = localize(context.name) || "North Sumatra Ophthalmology";
  const description = localize(context.description);
  const recent = issues.slice(0, 3);
  const featured = currentIssue?.articles?.slice(0, 4) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-bold tracking-widest text-dark uppercase">
              Open Access · Peer Reviewed
            </span>
            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-dark sm:text-5xl lg:text-6xl">
              {journalName}
            </h1>
            {description ? (
              <RichText html={description} className="mt-6 max-w-2xl text-lg text-slate" />
            ) : (
              <p className="mt-6 max-w-2xl text-lg text-slate">
                Advancing ophthalmology and vision science through rigorous,
                openly accessible research from North Sumatra and beyond.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/issues" variant="dark">
                Browse Issues
              </ButtonLink>
              <ButtonLink href={ojsLinks.submit} variant="outline">
                Make a Submission
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Current issue */}
      {currentIssue && (
        <section>
          <Container className="py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
              <div>
                <p className="text-sm font-bold tracking-widest text-primary uppercase">
                  Current Issue
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-dark">
                  {currentIssue.identification ?? localize(currentIssue.title)}
                </h2>
                {localize(currentIssue.description) && (
                  <RichText
                    html={localize(currentIssue.description)}
                    className="mt-4 text-slate"
                  />
                )}
                <div className="mt-6">
                  <ButtonLink
                    href={`/issues/${currentIssue.id}`}
                    variant="primary"
                    size="sm"
                  >
                    View full issue
                  </ButtonLink>
                </div>
              </div>

              <div className="rounded-3xl border border-line p-2 sm:p-6">
                {featured.length > 0 ? (
                  featured.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      sections={currentIssue.sections}
                    />
                  ))
                ) : (
                  <p className="p-6 text-slate">
                    No articles in this issue yet.
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Recent issues */}
      {recent.length > 0 && (
        <section className="bg-paper">
          <Container className="py-16 lg:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold text-dark">
                Recent Issues
              </h2>
              <ButtonLink href="/issues" variant="outline" size="sm">
                All issues
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
