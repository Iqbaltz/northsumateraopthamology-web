"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { ojsLinks } from "@/lib/links";

const nav = [
  { label: "Home", href: "/" },
  { label: "Issues", href: "/issues" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-extrabold text-dark">
              N
            </span>
            <span className="text-lg leading-tight font-extrabold tracking-tight text-dark">
              North&nbsp;Sumatra
              <span className="block text-xs font-medium tracking-widest text-muted uppercase">
                Ophthalmology
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors hover:text-dark ${
                  isActive(item.href) ? "text-dark" : "text-slate"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ojsLinks.search()}
              className="text-sm font-semibold text-slate transition-colors hover:text-dark"
            >
              Search
            </a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href={ojsLinks.login} variant="outline" size="sm">
              Login
            </ButtonLink>
            <ButtonLink href={ojsLinks.submit} variant="primary" size="sm">
              Submit
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 text-base font-semibold ${
                    isActive(item.href) ? "bg-paper text-dark" : "text-slate"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={ojsLinks.search()}
                className="rounded-xl px-3 py-2 text-base font-semibold text-slate"
              >
                Search
              </a>
              <div className="mt-3 flex gap-3 px-3">
                <ButtonLink href={ojsLinks.login} variant="outline" size="sm">
                  Login
                </ButtonLink>
                <ButtonLink href={ojsLinks.submit} variant="primary" size="sm">
                  Submit
                </ButtonLink>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
