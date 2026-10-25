import type { SearchField, SearchResult, SearchValues } from "@/components/search/content";

type MatchField = Exclude<SearchField, "all"> | "authors";

/** A published article with the text a search is matched against. */
export type SearchRecord = {
  result: SearchResult;
  sectionId?: number;
  /** ISO `yyyy-mm-dd`; "" when OJS has no publication date. */
  publishedOn: string;
  text: Record<MatchField, string>;
};

export type SearchResultPage = {
  results: SearchResult[];
  total: number;
  /** 1-based page number. */
  page: number;
  totalPages: number;
};

/** How much a term found in each field lifts a result up the list. */
const fieldWeight: Record<MatchField, number> = {
  title: 4,
  keywords: 3,
  authors: 2,
  abstract: 1,
};

/** Lowercase without accents, so "glaucóma" finds "Glaucoma". */
function fold(text: string): string {
  return text.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** The words of a query; a "quoted phrase" counts as one term. */
function terms(query: string): string[] {
  return [...fold(query).matchAll(/"([^"]+)"|[^\s"]+/g)]
    .map((match) => (match[1] ?? match[0]).trim())
    .filter(Boolean);
}

/** Whether `term` starts a word of `text`: "glauc" finds "glaucoma", "rina" skips "Karina". */
function startsWord(text: string, term: string): boolean {
  for (let index = text.indexOf(term); index !== -1; index = text.indexOf(term, index + 1)) {
    if (index === 0 || !/[a-z0-9]/.test(text[index - 1])) return true;
  }
  return false;
}

/** First day a "Past N months" preset keeps, as ISO `yyyy-mm-dd`. */
function monthsAgo(months: number, now: Date): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, now.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

/**
 * A record's rank for the query, or 0 when it misses. Every term has to start a
 * word in one of the searched fields and scores that field's weight.
 */
function score(record: SearchRecord, queryTerms: string[], field: SearchField): number {
  const fields: MatchField[] =
    field === "all" ? ["title", "keywords", "authors", "abstract"] : [field];
  const haystacks = fields.map((name) => ({ text: fold(record.text[name]), weight: fieldWeight[name] }));

  let total = 0;
  for (const term of queryTerms) {
    const best = Math.max(
      0,
      ...haystacks.filter(({ text }) => startsWord(text, term)).map(({ weight }) => weight),
    );
    if (!best) return 0;
    total += best;
  }
  return total;
}

/**
 * One page of the records matching a search. All filters must hold; with a
 * query, the best matches come first, otherwise (and on ties) the newest.
 */
export function searchRecords(
  records: SearchRecord[],
  values: SearchValues,
  page: number,
  now = new Date(),
): SearchResultPage {
  const queryTerms = terms(values.query);
  const authorTerms = terms(values.authors);
  const cutoff = values.within ? monthsAgo(Number(values.within), now) : "";
  const after = values.publishedAfter > cutoff ? values.publishedAfter : cutoff;
  const before = values.publishedBefore;

  const ranked = records
    .filter(
      (record) =>
        (!values.types.length ||
          (record.sectionId !== undefined && values.types.includes(record.sectionId))) &&
        (!after || record.publishedOn >= after) &&
        (!before || (record.publishedOn && record.publishedOn <= before)) &&
        authorTerms.every((term) => startsWord(fold(record.text.authors), term)),
    )
    .map((record) => ({ record, score: queryTerms.length ? score(record, queryTerms, values.field) : 1 }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.record.publishedOn.localeCompare(a.record.publishedOn),
    );

  const start = (page - 1) * values.perPage;
  return {
    results: ranked.slice(start, start + values.perPage).map(({ record }) => record.result),
    total: ranked.length,
    page,
    totalPages: Math.ceil(ranked.length / values.perPage),
  };
}
