import Link from "next/link";
import { shell } from "@/components/landing/styles";

export const authFieldClass =
  "h-12 w-full rounded-lg border border-[#dbe2e6] bg-white px-3.5 text-sm text-[#0c0c0c] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#9aa5ab] focus:border-[#07868f] focus:shadow-[0_0_0_3px_rgb(7_134_143/0.12)]";

export const authLabelClass = "mb-1.5 block text-sm font-semibold text-[#0c0c0c]";

/** Centred card used by both the sign-in and registration pages. */
export function AuthShell({
  kicker,
  title,
  description,
  children,
  footer,
}: {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: { text: string; linkLabel: string; href: string };
}) {
  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] py-14 sm:py-20">
      <div className={shell}>
        <div className="mx-auto w-full max-w-[560px] rounded-xl border border-[#d5e0e2] bg-white p-6 sm:p-10 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)]">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#07868f]">
            {kicker}
          </p>
          <h1 className="mt-2.5 text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#4a4a4a]">{description}</p>

          <div className="mt-7">{children}</div>

          <p className="mt-6 border-t border-[#e3eaef] pt-5 text-sm text-[#4a4a4a]">
            {footer.text}{" "}
            <Link
              className="rounded-sm font-bold text-[#07868f] transition-colors duration-200 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
              href={footer.href}
            >
              {footer.linkLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mb-5 rounded-lg border border-[#e6c0c0] bg-[#fdf3f3] px-4 py-3 text-sm text-[#a32f2f]"
    >
      {message}
    </p>
  );
}
