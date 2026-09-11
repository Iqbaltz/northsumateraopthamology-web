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

export function XMark({ className = "" }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.2} className={`size-4 shrink-0 ${className}`}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
