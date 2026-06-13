import Link from "next/link";
import { Container } from "./Container";
import { ojsLinks } from "@/lib/links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-dark text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-extrabold text-dark">
                N
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                North Sumatra Ophthalmology
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              A peer-reviewed, open-access journal publishing original research,
              reviews, and case reports in ophthalmology and vision science.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/issues" className="hover:text-white">Issues</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><a href={ojsLinks.search()} className="hover:text-white">Search</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase">
              For Authors
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><a href={ojsLinks.submit} className="hover:text-white">Make a Submission</a></li>
              <li><a href={ojsLinks.register} className="hover:text-white">Register</a></li>
              <li><a href={ojsLinks.login} className="hover:text-white">Login</a></li>
              <li><a href={ojsLinks.editorialTeam} className="hover:text-white">Editorial Team</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} North Sumatra Ophthalmology. All rights reserved.</p>
          <p>Published with Open Journal Systems.</p>
        </div>
      </Container>
    </footer>
  );
}
