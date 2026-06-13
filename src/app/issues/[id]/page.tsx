import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { ArticleCard } from "@/components/ArticleCard";
import { RichText } from "@/components/RichText";
import { getIssue } from "@/lib/ojs";
import { localize } from "@/lib/ojs/localize";
import { formatDate } from "@/lib/format";
import { ojsLinks } from "@/lib/links";
import type { Article } from "@/lib/ojs/types";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const issue = await getIssue(Number(id));
  if (!issue) return { title: "Issue not found" };
  const label = issue.identification ?? localize(issue.title) ?? "Issue";
  return {
    title: label,
    description: localize(issue.description).replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function IssuePage({ params }: Params) {
  const { id } = await params;
  const issue = await getIssue(Number(id));
  if (!issue) notFound();

  const title = localize(issue.title);
  const description = localize(issue.description);
  const articles = issue.articles ?? [];

  // Group articles by section, preserving section order.
  const sections = (issue.sections ?? []).slice().sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));
  const grouped: { sectionId?: number; label: string; items: Article[] }[] = [];
  const bySection = new Map<number | undefined, Article[]>();
  for (const article of articles) {
    const sid = article.sectionId ?? article.publications?.[0]?.sectionId;
    if (!bySection.has(sid)) bySection.set(sid, []);
    bySection.get(sid)!.push(article);
  }
  for (const section of sections) {
    const items = bySection.get(section.id);
    if (items?.length) grouped.push({ sectionId: section.id, label: localize(section.title), items });
  }
  // Any articles whose section wasn't listed.
  for (const [sid, items] of bySection) {
    if (!sections.some((s) => s.id === sid) && items.length) {
      grouped.push({ sectionId: sid, label: "", items });
    }
  }

  return (
    <>
      <section className="bg-paper">
        <Container className="py-14 lg:py-16">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            {issue.identification ?? `Vol. ${issue.volume ?? ""} No. ${issue.number ?? ""}`}
          </p>
          {title && <h1 className="mt-3 text-4xl font-extrabold text-dark">{title}</h1>}
          {issue.datePublished && (
            <p className="mt-3 text-sm font-semibold tracking-wide text-muted uppercase">
              Published {formatDate(issue.datePublished)}
            </p>
          )}
          {description && (
            <RichText html={description} className="mt-5 max-w-3xl text-slate" />
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={ojsLinks.issue(issue.id)} variant="outline" size="sm">
              View on OJS
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        {grouped.length > 0 ? (
          <div className="space-y-14">
            {grouped.map((group, i) => (
              <section key={group.sectionId ?? `s-${i}`}>
                {group.label && (
                  <h2 className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">
                    {group.label}
                  </h2>
                )}
                <div>
                  {group.items.map((article) => (
                    <ArticleCard key={article.id} article={article} sections={issue.sections} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-line bg-paper p-10 text-center text-slate">
            This issue has no articles yet.
          </p>
        )}
      </Container>
    </>
  );
}
