"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { button, outlineButton, shell } from "@/components/landing/styles";
import { landingContent } from "@/components/landing/content";
import { ojsLinks } from "@/lib/links";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const content = landingContent.header;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return href !== "#" && pathname.startsWith(href);
  };

  return (
    <header className="relative z-50 bg-white text-[#0c0c0c]">
      {/* Top micro-bar */}
      <div className="bg-[#f3f3f3] max-[700px]:hidden">
        <div
          className={`${shell} flex min-h-[48px] py-2 items-center justify-between gap-6 font-serif text-[#07868f]`}
        >
          <div className="flex flex-col justify-center min-w-0 pr-2">
            <span className="text-xs sm:text-sm lg:text-base font-semibold leading-tight tracking-tight">
              Peer-reviewed. Open access.
            </span>
            <span className="text-[11px] sm:text-xs lg:text-sm font-normal leading-tight text-[#07868f]/85">
              Advancing eye care worldwide
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-4 lg:gap-8 font-sans font-semibold text-xs lg:text-sm">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Image src="/figma/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="sm:size-6" />
              {content.whatsapp}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Image src="/figma/envelope.svg" alt="Email" width={20} height={20} className="sm:size-6" />
              {content.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={`${shell} flex h-[108px] items-center justify-between gap-6 max-[1200px]:h-[82px] max-[700px]:h-[76px]`}>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="JONSON Homepage"
          className="relative h-[40px] w-[265px] shrink-0 motion-safe:animate-logo-enter max-[1200px]:h-[34.14px] max-[1200px]:w-[151px]"
        >
          <Image
            className="absolute top-0 left-[139px] h-[60px] w-[86px] max-[1200px]:left-[79px] max-[1200px]:h-[34.14px] max-[1200px]:w-[49px]"
            src="/figma/logo-symbol.svg"
            alt=""
            width={86}
            height={60}
            priority
          />
          <Image
            className="absolute top-[13px] left-0 h-[34px] w-[265px] max-[1200px]:top-[7.5px] max-[1200px]:h-[19px] max-[1200px]:w-[151px]"
            src="/figma/logo-word.svg"
            alt="JONSON - Journal of North Sumatera Ophthalmology Nexus"
            width={265}
            height={34}
            priority
          />
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-3 xl:gap-4 max-[1200px]:hidden">
          {content.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative rounded-md px-2.5 py-1.5 text-sm xl:text-base leading-[19px] font-semibold transition-colors duration-200 after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#07868f] after:transition-transform after:duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 motion-safe:hover:after:scale-x-100 ${isActive(item.href) ? "text-[#07868f] after:scale-x-100" : "text-[#0c0c0c]"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 max-[1200px]:hidden">
          <a href={ojsLinks.login} className={`${button} ${outlineButton} !min-h-5 px-4 py-[7px] text-xs font-semibold`}>
            {content.login}
          </a>
          <a href={ojsLinks.submit} className={`${button} !min-h-5 px-4 py-[7px] text-xs font-semibold`}>
            {content.submit}
          </a>
        </div>

        {/* Mobile / Tablet menu trigger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto hidden size-10 place-items-center rounded-lg border border-[#d5e0e2] bg-white text-[21px] transition-[transform,background-color,border-color] duration-300 hover:border-[#07868f] hover:bg-[#e8f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 motion-safe:active:scale-95 max-[1200px]:grid"
        >
          <span>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute right-0 left-0 border-t border-[#d5e0e2] bg-white px-[58px] py-5 shadow-[0_15px_30px_rgb(0_0_0/0.08)] motion-safe:animate-menu-enter min-[1201px]:hidden max-[700px]:px-5">
          <nav className="grid gap-1">
            {content.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-[9px] font-semibold transition-[color,background-color,transform] duration-300 hover:bg-[#eff4f7] hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:translate-x-1 ${isActive(item.href) ? "bg-[#eff4f7] text-[#07868f]" : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3">
              <a href={ojsLinks.login} className={`${button} ${outlineButton} flex-1 text-center justify-center`}>
                {content.login}
              </a>
              <a href={ojsLinks.submit} className={`${button} flex-1 text-center justify-center`}>
                {content.submit}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
