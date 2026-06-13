import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { GalleyLinks } from "@/components/GalleyLinks";
import { findArticle } from "@/lib/ojs";
import { articleView, sectionTitle } from "@/lib/ojs/article";
import { localize } from "@/lib/ojs/localize";
import { formatDate } from "@/lib/format";
import { ojsLinks } from "@/lib/links";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const found = await findArticle(Number(id));
  if (!found) return { title: "Article not found" };
  const view = articleView(found.article);
  return {
    title: view.title,
    description: view.abstractHtml.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function ArticlePage({ params }: Params) {
  const { id } = await params;
  const found = await findArticle(Number(id));
  if (!found) notFound();

  const { article, issue } = found;
  const view = articleView(article);
  const section = sectionTitle(issue.sections, view.sectionId);
  const authors = view.publication?.authors ?? [];

  return (
    <>
      <section className="bg-paper">
        <Container className="py-12 lg:py-16">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/issues" className="hover:text-dark">
              Issues
            </Link>
            <span className="px-2">/</span>
            <Link href={`/issues/${issue.id}`} className="hover:text-dark">
              {issue.identification ?? localize(issue.title) ?? "Issue"}
            </Link>
          </nav>

          {section && (
            <p className="text-sm font-bold tracking-widest text-primary uppercase">{section}</p>
          )}
          <h1 className="mt-3 max-w-4xl text-3xl leading-tight font-extrabold text-dark sm:text-4xl">
            {view.title}
          </h1>

          {authors.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {authors.map((author) => (
                <li key={author.id} className="text-sm">
                  <span className="font-semibold text-dark">
                    {author.fullName ?? localize(author.givenName)}
                  </span>
                  {localize(author.affiliation) && (
                    <span className="text-muted"> · {localize(author.affiliation)}</span>
                  )}
                  {author.orcid && (
                    <a
                      href={author.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[#a6ce39]"
                      title="ORCID"
                    >
                      iD
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            view.authors && <p className="mt-6 text-sm text-slate">{view.authors}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold tracking-wide text-muted uppercase">
            {view.publication?.datePublished && (
              <span>Published {formatDate(view.publication.datePublished)}</span>
            )}
            {view.pages && <span>Pages {view.pages}</span>}
            {view.doi && (
              <a
                href={`https://doi.org/${view.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="normal-case hover:text-dark"
              >
                DOI: {view.doi}
              </a>
            )}
          </div>

          {view.galleys.length > 0 && (
            <div className="mt-8">
              <GalleyLinks submissionId={article.id} galleys={view.galleys} size="md" />
            </div>
          )}
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Abstract</h2>
            {view.abstractHtml ? (
              <div
                className="mt-4 max-w-2xl text-base leading-relaxed text-ink [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: view.abstractHtml }}
              />
            ) : (
              <p className="mt-4 text-slate">No abstract available.</p>
            )}
          </article>

          <aside className="h-fit rounded-3xl border border-line bg-paper p-6">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
              Reading tools
            </h2>
            <p className="mt-3 text-sm text-slate">
              Full text, citation formats, and reader tools are served by the
              journal platform.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink href={ojsLinks.article(article.id)} variant="dark" size="sm">
                Open on OJS
              </ButtonLink>
              {view.galleys[0] && (
                <ButtonLink
                  href={ojsLinks.galleyDownload(article.id, view.galleys[0].id)}
                  variant="outline"
                  size="sm"
                >
                  Download {view.galleys[0].label ?? "full text"}
                </ButtonLink>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
