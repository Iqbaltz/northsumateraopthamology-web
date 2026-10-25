"use client";

import { useState } from "react";
import { CalendarBlank, MagnifyingGlass } from "@/components/icons";

export const fieldClass =
  "flex h-12 items-center gap-2.5 rounded-lg border border-[#dbe2e6] bg-white px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-[#07868f] focus-within:shadow-[0_0_0_3px_rgb(7_134_143/0.12)]";

export const inputClass =
  "w-full min-w-0 bg-transparent text-sm text-[#0c0c0c] outline-none placeholder:text-[#9aa5ab]";

/** The visible submit for a form, sitting at the end of its Title/Keyword field. */
export function SearchButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      aria-label={label}
      title={label}
      className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[#e3eaef] text-[#07868f] transition-colors duration-200 hover:bg-[#07868f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2"
    >
      <MagnifyingGlass />
    </button>
  );
}

/**
 * A date bound shows the designed placeholder while empty, then becomes a real
 * date picker on focus. It submits as ISO `yyyy-mm-dd`, the form /search reads.
 */
export function DateField({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}: {
  name: "publishedAfter" | "publishedBefore";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={fieldClass}>
      <CalendarBlank className="text-[#07868f]" />
      <input
        type={focused || value ? "date" : "text"}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
      />
    </div>
  );
}
