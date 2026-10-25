import { searchContent, type SearchField, type SearchValues } from "./content";

type SearchParams = { [key: string]: string | string[] | undefined };

export const defaultSearchValues: SearchValues = {
  query: "",
  field: "all",
  authors: "",
  publishedAfter: "",
  publishedBefore: "",
  within: "",
  types: [],
  perPage: searchContent.perPage.initial,
};

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function all(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/** A real `yyyy-mm-dd` date, or "" for anything else. */
function isoDate(value: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) ? value : "";
}

/** Reads the search from the URL, dropping anything malformed rather than failing. */
export function parseSearchValues(params: SearchParams): SearchValues {
  const field = first(params.field);
  const within = first(params.within);
  const perPage = Number(first(params.perPage));
  const types = all(params.type)
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0);

  return {
    query: first(params.query),
    field: searchContent.field.options.some((option) => option.value === field)
      ? (field as SearchField)
      : defaultSearchValues.field,
    authors: first(params.authors),
    publishedAfter: isoDate(first(params.publishedAfter)),
    publishedBefore: isoDate(first(params.publishedBefore)),
    within: searchContent.date.within.some((option) => option.value === within) ? within : "",
    types: [...new Set(types)].sort((a, b) => a - b),
    perPage: searchContent.perPage.options.includes(perPage)
      ? perPage
      : defaultSearchValues.perPage,
  };
}

/** `?page=` as a positive whole number; anything else reads as the first page. */
export function requestedPage(params: SearchParams): number {
  const page = Number(first(params.page));
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

/** URL of a search, leaving out every value still at its default. */
export function searchPath(values: SearchValues, page = 1): string {
  const params = new URLSearchParams();
  const query = values.query.trim();
  const authors = values.authors.trim();

  if (query) params.set("query", query);
  if (values.field !== defaultSearchValues.field) params.set("field", values.field);
  if (authors) params.set("authors", authors);
  if (values.publishedAfter) params.set("publishedAfter", values.publishedAfter);
  if (values.publishedBefore) params.set("publishedBefore", values.publishedBefore);
  if (values.within) params.set("within", values.within);
  for (const type of values.types) params.append("type", String(type));
  if (values.perPage !== defaultSearchValues.perPage) params.set("perPage", String(values.perPage));
  if (page > 1) params.set("page", String(page));

  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

/** The same search with every sidebar filter cleared. */
export function unfilteredSearchPath(values: SearchValues): string {
  return searchPath({
    ...defaultSearchValues,
    query: values.query,
    field: values.field,
    perPage: values.perPage,
  });
}

/** How many filter groups (author, publication date, article type) narrow the search. */
export function activeFilterCount(values: SearchValues): number {
  return [
    values.authors,
    values.publishedAfter || values.publishedBefore || values.within,
    values.types.length,
  ].filter(Boolean).length;
}
