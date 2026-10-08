import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  /** URL of a given page. */
  hrefFor: (page: number) => string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2";

const stepClass = `inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium ${focusRing}`;

const numberClass = `inline-flex size-9 items-center justify-center rounded-md text-sm ${focusRing}`;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} />
    </svg>
  );
}

/**
 * Page numbers to list, `null` marking a run of skipped pages: the first and
 * last two pages plus a three-page window around the current one, e.g.
 * 1 2 3 … 67 68. A gap that would hide a single page shows that page instead.
 */
function pageItems(page: number, totalPages: number): (number | null)[] {
  const windowStart = Math.min(Math.max(page - 1, 1), Math.max(totalPages - 2, 1));
  const shown = [1, 2, totalPages - 1, totalPages, windowStart, windowStart + 1, windowStart + 2];
  const pages = [...new Set(shown)]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);

  const items: (number | null)[] = [];
  let last = 0;
  for (const n of pages) {
    if (n - last === 2) items.push(last + 1);
    else if (n - last > 2) items.push(null);
    items.push(n);
    last = n;
  }
  return items;
}

function Step({
  direction,
  target,
  totalPages,
  hrefFor,
}: {
  direction: "prev" | "next";
  target: number;
  totalPages: number;
  hrefFor: PaginationProps["hrefFor"];
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  const content =
    direction === "prev" ? (
      <>
        <Arrow direction="left" />
        {label}
      </>
    ) : (
      <>
        {label}
        <Arrow direction="right" />
      </>
    );

  if (target < 1 || target > totalPages) {
    return (
      <span className={`${stepClass} cursor-not-allowed text-[#b5bdc1]`} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <Link
      className={`${stepClass} text-[#0c0c0c] transition-colors duration-200 hover:text-[#07868f]`}
      href={hrefFor(target)}
      rel={direction}
    >
      {content}
    </Link>
  );
}

/** Previous / numbered / next links. Renders nothing when everything fits on one page. */
export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-12 sm:mt-14 flex items-center justify-between gap-4 sm:justify-end"
      aria-label="Pagination"
      data-reveal
    >
      <Step direction="prev" target={page - 1} totalPages={totalPages} hrefFor={hrefFor} />

      <ol className="hidden sm:flex items-center gap-1">
        {pageItems(page, totalPages).map((item, index) =>
          item === null ? (
            <li className={`${numberClass} text-[#8d8d8d]`} key={`gap-${index}`} aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span
                  className={`${numberClass} bg-[#07868f] font-semibold text-white`}
                  aria-current="page"
                >
                  {item}
                </span>
              ) : (
                <Link
                  className={`${numberClass} text-[#0c0c0c] transition-colors duration-200 hover:bg-[#e8f4f4] hover:text-[#07868f]`}
                  href={hrefFor(item)}
                  aria-label={`Page ${item}`}
                >
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
      </ol>
      <p className="text-sm text-[#4a4a4a] sm:hidden">
        Page {page} of {totalPages}
      </p>

      <Step direction="next" target={page + 1} totalPages={totalPages} hrefFor={hrefFor} />
    </nav>
  );
}
