import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { IssueCard } from "@/components/IssueCard";
import { getIssues } from "@/lib/ojs";

export const metadata: Metadata = {
  title: "Issues",
  description: "Browse all published issues of North Sumatra Ophthalmology.",
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <Container className="py-16 lg:py-20">
      <header className="max-w-2xl">
        <p className="text-sm font-bold tracking-widest text-primary uppercase">Archive</p>
        <h1 className="mt-3 text-4xl font-extrabold text-dark">Issues</h1>
        <p className="mt-4 text-slate">
          All published issues of the journal, most recent first.
        </p>
      </header>

      {issues.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-3xl border border-line bg-paper p-10 text-center text-slate">
          No issues have been published yet. Please check back soon.
        </p>
      )}
    </Container>
  );
}
