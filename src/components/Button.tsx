import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-dark hover:bg-dark hover:text-white",
  dark: "bg-dark text-white hover:bg-primary hover:text-dark",
  outline: "border border-dark text-dark hover:bg-dark hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-base",
  sm: "px-5 py-2 text-sm",
};

function classes(variant: Variant, size: Size, className?: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`.trim();
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Pill-shaped link button. Uses Next Link for internal routes, <a> for external. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const cls = classes(variant, size, className);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
