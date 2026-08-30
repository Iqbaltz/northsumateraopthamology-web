import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

function BreadcrumbCaret() {
  return (
    <svg
      className="size-3.5 shrink-0 text-[#9aa8ae]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/** Trail of links ending in the current page, which renders as plain text. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" data-reveal>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#5c6b73]">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="flex items-center gap-x-2.5" key={crumb.label}>
              {index > 0 && <BreadcrumbCaret />}
              {isLast ? (
                <span className="text-[#0c0c0c]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  className="rounded-sm transition-colors duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
