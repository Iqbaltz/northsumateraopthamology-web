"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ComponentProps, type ReactNode } from "react";
import { Chevron, UserCircle } from "@/components/icons";
import { searchContent, type ArticleType, type SearchValues } from "./content";
import { DateField, fieldClass, inputClass, SearchButton } from "./fields";
import { activeFilterCount, searchPath, unfilteredSearchPath } from "./path";

const smallLink =
  "rounded-sm text-xs font-semibold uppercase tracking-[0.04em] text-[#07868f] transition-colors duration-200 hover:text-[#066e75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2";

const groupTitle = "text-sm font-bold text-[#0c0c0c]";

const optionClass = "flex w-fit cursor-pointer items-center gap-2.5 text-sm text-[#0c0c0c]";

const controlClass = "size-4 shrink-0 cursor-pointer accent-[#07868f]";

function Select({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <div className={`relative ${className}`}>
      <select
        {...props}
        className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#dbe2e6] bg-white pr-10 pl-3.5 text-sm text-[#0c0c0c] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#07868f] focus:shadow-[0_0_0_3px_rgb(7_134_143/0.12)]"
      >
        {children}
      </select>
      <Chevron
        open={false}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#0c0c0c]"
      />
    </div>
  );
}

/**
 * The search and its filters. Menus, presets and checkboxes search as soon as
 * they change; typed values search on Enter or once the field is left.
 * `children` is the server-rendered list of results.
 */
export function SearchForm({
  values: current,
  articleTypes,
  heading,
  children,
}: {
  values: SearchValues;
  articleTypes: ArticleType[];
  heading: string;
  children: ReactNode;
}) {
  const content = searchContent;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState(current);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Follow the URL when it changes underneath the form: a reset link, a new
  // search from the header, or Back/Forward.
  const currentPath = searchPath(current);
  const [syncedPath, setSyncedPath] = useState(currentPath);
  if (syncedPath !== currentPath) {
    setSyncedPath(currentPath);
    setValues(current);
  }

  const update = (patch: Partial<SearchValues>) => setValues((value) => ({ ...value, ...patch }));

  const search = (next: SearchValues) => {
    setValues(next);
    startTransition(() => router.push(searchPath(next), { scroll: false }));
  };

  const apply = (patch: Partial<SearchValues>) => search({ ...values, ...patch });

  /** A typed value searches once left, unless it is unchanged or a search is already on its way. */
  const commit = () => {
    if (!pending && searchPath(values) !== currentPath) search(values);
  };

  const resetDateHref = searchPath({ ...current, publishedAfter: "", publishedBefore: "", within: "" });
  const activeFilters = activeFilterCount(current);

  return (
    <form
      action="/search"
      aria-label={content.submit}
      onSubmit={(event) => {
        event.preventDefault();
        search(values);
      }}
      className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 min-[1201px]:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] min-[1201px]:grid-rows-[auto_1fr] min-[1201px]:gap-x-10 min-[1201px]:gap-y-6"
    >
      <div className="min-[1201px]:col-start-2 min-[1201px]:row-start-1">
        <h1 className="text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]" aria-live="polite">
          {heading}
        </h1>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 max-[700px]:grid-cols-1">
          <Select
            name="field"
            aria-label={content.field.label}
            value={values.field}
            onChange={(event) => apply({ field: event.target.value as SearchValues["field"] })}
          >
            {content.field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <div className={fieldClass}>
            <span className="shrink-0 text-sm font-bold text-[#07868f]" aria-hidden>
              Aa
            </span>
            <input
              type="search"
              name="query"
              className={inputClass}
              placeholder={content.query}
              aria-label={content.query}
              value={values.query}
              onChange={(event) => update({ query: event.target.value })}
              onBlur={commit}
            />
            <SearchButton label={content.submit} />
          </div>
        </div>
      </div>

      <aside
        className="min-[1201px]:col-start-1 min-[1201px]:row-span-2 min-[1201px]:row-start-1 min-[1201px]:border-r min-[1201px]:border-[#e3eaef] min-[1201px]:pr-10"
        aria-label={content.filters.title}
      >
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="search-filters"
          onClick={() => setFiltersOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#dbe2e6] bg-white px-4 py-3 text-sm font-bold text-[#0c0c0c] transition-colors duration-200 hover:border-[#07868f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 min-[1201px]:hidden"
        >
          <span>
            {content.filters.title}
            {activeFilters > 0 && <span className="ml-1.5 text-[#07868f]">({activeFilters})</span>}
          </span>
          <Chevron open={filtersOpen} />
        </button>

        <div
          id="search-filters"
          className={`max-[1200px]:mt-4 ${filtersOpen ? "" : "max-[1200px]:hidden"}`}
        >
          <div className="flex items-center justify-end gap-3 max-[1200px]:justify-start">
            <label className="text-sm text-[#5c5c5c]" htmlFor="search-per-page">
              {content.perPage.label}
            </label>
            <Select
              id="search-per-page"
              name="perPage"
              className="w-[84px]"
              value={values.perPage}
              onChange={(event) => apply({ perPage: Number(event.target.value) })}
            >
              {content.perPage.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          {/* Below the desktop layout the toggle above already names the panel. */}
          <div className="mt-7 flex items-center justify-between gap-3 max-[1200px]:mt-5 max-[1200px]:justify-end">
            <h2 className="text-lg font-bold text-[#0c0c0c] max-[1200px]:sr-only">
              {content.filters.title}
            </h2>
            <Link className={smallLink} href={unfilteredSearchPath(current)} scroll={false}>
              {content.filters.resetAll}
            </Link>
          </div>

          <div className={`${fieldClass} mt-4`}>
            <UserCircle className="text-[#07868f]" />
            <input
              type="text"
              name="authors"
              className={inputClass}
              placeholder={content.filters.author}
              aria-label={content.filters.author}
              value={values.authors}
              onChange={(event) => update({ authors: event.target.value })}
              onBlur={commit}
            />
          </div>

          <div className="mt-7" role="group" aria-labelledby="search-date-title">
            <div className="flex items-center justify-between gap-3">
              <h3 className={groupTitle} id="search-date-title">
                {content.date.title}
              </h3>
              <Link className={smallLink} href={resetDateHref} scroll={false}>
                {content.date.reset}
              </Link>
            </div>
            <div className="mt-3 grid gap-3">
              <DateField
                name="publishedAfter"
                placeholder={content.date.publishedAfter}
                value={values.publishedAfter}
                onChange={(value) => update({ publishedAfter: value, within: "" })}
                onBlur={commit}
              />
              <DateField
                name="publishedBefore"
                placeholder={content.date.publishedBefore}
                value={values.publishedBefore}
                onChange={(value) => update({ publishedBefore: value, within: "" })}
                onBlur={commit}
              />
            </div>
            <div className="mt-4 grid gap-3">
              {content.date.within.map((option) => (
                <label className={optionClass} key={option.value}>
                  <input
                    type="radio"
                    name="within"
                    value={option.value}
                    className={controlClass}
                    checked={values.within === option.value}
                    onChange={() =>
                      apply({ within: option.value, publishedAfter: "", publishedBefore: "" })
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {articleTypes.length > 0 && (
            <div className="mt-7" role="group" aria-labelledby="search-type-title">
              <h3 className={groupTitle} id="search-type-title">
                {content.typesTitle}
              </h3>
              <div className="mt-3 grid gap-3">
                {articleTypes.map((type) => (
                  <label className={optionClass} key={type.id}>
                    <input
                      type="checkbox"
                      name="type"
                      value={type.id}
                      className={controlClass}
                      checked={values.types.includes(type.id)}
                      onChange={(event) =>
                        apply({
                          types: event.target.checked
                            ? [...values.types, type.id].sort((a, b) => a - b)
                            : values.types.filter((id) => id !== type.id),
                        })
                      }
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      <div
        className={`min-[1201px]:col-start-2 min-[1201px]:row-start-2 transition-opacity duration-200 ${
          pending ? "opacity-60" : ""
        }`}
        aria-busy={pending}
      >
        {children}
      </div>
    </form>
  );
}
