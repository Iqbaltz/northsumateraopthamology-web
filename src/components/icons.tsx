/**
 * Inline icons drawn with `currentColor`, for places where the exported
 * /figma SVGs can't be used because they hardcode a fill.
 */

type IconProps = { className?: string };

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Chevron({ open, className = "" }: IconProps & { open: boolean }) {
  return (
    <svg
      {...strokeProps}
      strokeWidth={2.4}
      className={`size-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MagnifyingGlass({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.2} className={`size-5 shrink-0 ${className}`}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export function CalendarBlank({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.9} className={`size-5 shrink-0 ${className}`}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function UserCircle({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.9} className={`size-5 shrink-0 ${className}`}>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

/** An eye inside a reticle: the mark for a subject area in the journal's scope. */
export function ScopeMark({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.5} className={`size-6 shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5" />
      <path d="M6.5 12c1.5-2.4 3.3-3.6 5.5-3.6s4 1.2 5.5 3.6c-1.5 2.4-3.3 3.6-5.5 3.6S8 14.4 6.5 12Z" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Envelope({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} className={`size-5 shrink-0 ${className}`}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function XMark({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.2} className={`size-4 shrink-0 ${className}`}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Phone({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`size-5 shrink-0 ${className}`}>
      <path d="M21.7 16.37 17.3 14.4a1.5 1.5 0 0 0-1.42.13l-2.36 1.57a7.3 7.3 0 0 1-3.62-3.6l1.57-2.4a1.5 1.5 0 0 0 .12-1.41L9.63 4.3a1.5 1.5 0 0 0-1.56-.9A5.27 5.27 0 0 0 3.5 8.63C3.5 15.18 8.82 20.5 15.38 20.5a5.27 5.27 0 0 0 5.22-4.57 1.5 1.5 0 0 0-.9-1.56Z" />
    </svg>
  );
}

export function MapPin({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`size-5 shrink-0 ${className}`}>
      <path
        fillRule="evenodd"
        d="M12 1.5a8.26 8.26 0 0 0-8.25 8.25c0 7.06 7.5 12.4 7.82 12.62a.75.75 0 0 0 .86 0c.32-.22 7.82-5.56 7.82-12.62A8.26 8.26 0 0 0 12 1.5Zm0 5.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

/** Solid disclosure triangle, as used on the desktop navigation dropdowns. */
export function CaretDown({ open, className = "" }: IconProps & { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={`size-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="M4.5 8.25h15L12 16.5z" />
    </svg>
  );
}
