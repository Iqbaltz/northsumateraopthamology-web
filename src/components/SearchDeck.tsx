"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { UserCircle, XMark } from "@/components/icons";
import { landingContent } from "@/components/landing/content";
import { shell } from "@/components/landing/styles";
import { DateField, fieldClass, inputClass } from "@/components/search/fields";
import { parseSearchValues, searchPath } from "@/components/search/path";

export function SearchDeck({ open, onClose }: { open: boolean; onClose: () => void }) {
  const content = landingContent.header.search;
  const router = useRouter();
  const queryRef = useRef<HTMLInputElement>(null);
  const [publishedAfter, setPublishedAfter] = useState("");
  const [publishedBefore, setPublishedBefore] = useState("");

  // Move focus into the deck when it opens, and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;
    queryRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Without JavaScript the form still lands on /search, just with empty fields in the URL.
  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "");

    router.push(
      searchPath(
        parseSearchValues({
          query: text("query"),
          authors: text("authors"),
          publishedAfter,
          publishedBefore,
        }),
      ),
    );
    onClose();
  };

  return (
    <div
      className={`grid border-[#e3eaef] bg-white transition-[grid-template-rows,opacity,border-color] duration-300 ease-out ${
        open ? "grid-rows-[1fr] border-b opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden" inert={!open}>
        <form
          action="/search"
          role="search"
          onSubmit={onSubmit}
          className={`${shell} flex items-center gap-4 py-5 transition-transform duration-300 ease-out max-[1200px]:flex-wrap max-[700px]:gap-3 ${
            open ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <span className="shrink-0 text-base sm:text-lg font-bold text-[#0c0c0c]">
            {content.label}
          </span>

          <div className="grid flex-1 grid-cols-[1.25fr_1fr_1fr_1fr] gap-3 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
            <div className={fieldClass}>
              <span className="shrink-0 text-sm font-bold text-[#07868f]" aria-hidden>
                Aa
              </span>
              <input
                ref={queryRef}
                type="search"
                name="query"
                className={inputClass}
                placeholder={content.query}
                aria-label={content.query}
              />
            </div>

            <DateField
              name="publishedAfter"
              placeholder={content.publishedAfter}
              value={publishedAfter}
              onChange={setPublishedAfter}
            />
            <DateField
              name="publishedBefore"
              placeholder={content.publishedBefore}
              value={publishedBefore}
              onChange={setPublishedBefore}
            />

            <div className={fieldClass}>
              <UserCircle className="text-[#07868f]" />
              <input
                type="text"
                name="authors"
                className={inputClass}
                placeholder={content.author}
                aria-label={content.author}
              />
            </div>
          </div>

          <button
            type="submit"
            className="sr-only focus:not-sr-only focus:rounded-lg focus:border focus:border-[#07868f] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#07868f]"
          >
            {content.submit}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 items-center gap-2 rounded-md px-1 py-1 text-sm font-medium text-[#4a4a4a] transition-colors duration-200 hover:text-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
          >
            {content.close}
            <XMark />
          </button>
        </form>
      </div>
    </div>
  );
}
