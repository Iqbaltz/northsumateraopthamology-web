"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarBlank, UserCircle, XMark } from "@/components/icons";
import { landingContent } from "@/components/landing/content";
import { shell } from "@/components/landing/styles";
import { dateFieldNames, dateFieldValues, ojsLinks } from "@/lib/links";

const fieldClass =
  "flex h-12 items-center gap-2.5 rounded-lg border border-[#dbe2e6] bg-white px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-[#07868f] focus-within:shadow-[0_0_0_3px_rgb(7_134_143/0.12)]";

const inputClass =
  "w-full min-w-0 bg-transparent text-sm text-[#0c0c0c] outline-none placeholder:text-[#9aa5ab]";

/**
 * A date bound shows the designed placeholder while empty, then becomes a real
 * date picker on focus. The value is submitted as OJS's year/month/day trio.
 */
function DateField({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: "dateFrom" | "dateTo";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const parts = dateFieldValues(value);

  return (
    <div className={fieldClass}>
      <CalendarBlank className="text-[#07868f]" />
      <input
        type={focused || value ? "date" : "text"}
        className={inputClass}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {parts &&
        dateFieldNames(name).map((fieldName, index) => (
          <input key={fieldName} type="hidden" name={fieldName} value={parts[index]} />
        ))}
    </div>
  );
}

export function SearchDeck({ open, onClose }: { open: boolean; onClose: () => void }) {
  const content = landingContent.header.search;
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

  return (
    <div
      className={`grid border-[#e3eaef] bg-white transition-[grid-template-rows,opacity,border-color] duration-300 ease-out ${
        open ? "grid-rows-[1fr] border-b opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden" inert={!open}>
        <form
          action={ojsLinks.searchAction}
          method="get"
          role="search"
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
              name="dateFrom"
              placeholder={content.publishedAfter}
              value={publishedAfter}
              onChange={setPublishedAfter}
            />
            <DateField
              name="dateTo"
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
