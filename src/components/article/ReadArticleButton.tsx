"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { XMark } from "@/components/icons";

/**
 * Opens the article's PDF in a popup over the page. Only files served from this
 * site can be framed; anything else (a remote galley, a placeholder) is a plain
 * link that opens in a new tab.
 */
export function ReadArticleButton({
  href,
  title,
  className,
  closeLabel,
  downloadHref,
  downloadLabel,
  children,
}: {
  href: string;
  title: string;
  className: string;
  closeLabel: string;
  downloadHref: string;
  downloadLabel: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  if (!href.startsWith("/files/")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  // The dialog fills the screen apart from its padding, so a click on the
  // dialog element itself (not its contents) is a click on the backdrop.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  return (
    <>
      <button type="button" className={className} onClick={show} aria-haspopup="dialog">
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={onClick}
        onClose={() => setOpen(false)}
        className="m-auto h-[min(92vh,980px)] w-[min(1100px,calc(100%_-_24px))] overflow-hidden rounded-xl border border-[#d5e0e2] bg-white p-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-[#e3eaef] px-4 py-3 sm:px-5">
            <p className="min-w-0 flex-1 truncate text-sm font-semibold text-[#0c0c0c]">{title}</p>
            <a
              href={downloadHref}
              className="shrink-0 rounded-sm text-sm font-bold text-[#07868f] hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
            >
              {downloadLabel}
            </a>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => dialogRef.current?.close()}
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#d5e0e2] transition-colors hover:border-[#07868f] hover:bg-[#e8f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f]"
            >
              <XMark />
            </button>
          </div>
          {/* Mounted only while open, so the PDF is not fetched until it is asked for. */}
          {open && <iframe src={href} title={title} className="min-h-0 w-full flex-1 bg-[#f3f3f3]" />}
        </div>
      </dialog>
    </>
  );
}
