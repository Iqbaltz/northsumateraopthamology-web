import type { Metadata } from "next";
import { MotionEffects } from "@/components/landing";
import { shell } from "@/components/landing/styles";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section data-not-found className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] py-20 sm:py-28">
      {/* Reveals the footer, whose logo and link columns start hidden. */}
      <MotionEffects />
      <div className={`${shell} text-center`}>
        <p className="font-serif text-[96px] font-bold leading-none text-[#07868f] sm:text-[120px]">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-[#0c0c0c] sm:text-[28px]">
          Not Found
        </h1>
        <p className="mt-6 text-base leading-[26px] text-[#3f3f3f]">
          The resource requested could not be found on this server.
        </p>
      </div>
    </section>
  );
}
