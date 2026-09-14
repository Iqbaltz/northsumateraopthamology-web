import { landingContent } from "@/components/landing/content";

/** Link to the journal's Creative Commons licence, shown as the CC · BY · SA marks. */
export function CreativeCommonsBadge({ className = "" }: { className?: string }) {
  const license = landingContent.footer.license;

  return (
    <a
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#c9d3d7] bg-white px-2.5 py-1.5 text-[#0c0c0c] transition-[border-color,color] duration-200 hover:border-[#07868f] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] ${className}`}
      href={license.href}
      target="_blank"
      rel="license noopener noreferrer"
      aria-label={license.name}
    >
      <CreativeCommonsIcons />
      <span className="text-[11px] font-bold tracking-[0.04em]">{license.badge}</span>
    </a>
  );
}

/** The CC, BY (attribution) and SA (share-alike) marks, drawn with currentColor. */
function CreativeCommonsIcons() {
  const ring = { cx: 12, cy: 12, r: 10.25, fill: "none", stroke: "currentColor", strokeWidth: 1.6 };

  return (
    <span className="flex items-center gap-1" aria-hidden>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <path
          d="M10.8 10.2a2.55 2.55 0 1 0 0 3.6M16.8 10.2a2.55 2.55 0 1 0 0 3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <circle cx="12" cy="6.9" r="1.65" fill="currentColor" />
        <path d="M9.4 9.6h5.2v4.6h-1.4V18h-2.4v-3.8H9.4z" fill="currentColor" />
      </svg>
      <svg className="size-[18px]" viewBox="0 0 24 24">
        <circle {...ring} />
        <path
          d="M7.6 12a4.4 4.4 0 1 1 1.3 3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M5.6 10.6h4l-2 2.6z" fill="currentColor" />
      </svg>
    </span>
  );
}
