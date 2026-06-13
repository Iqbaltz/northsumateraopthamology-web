import { DEFAULT_LOCALE } from "../config";
import type { LocalizedString } from "./types";

/**
 * Resolve an OJS localized field to a plain string. OJS returns either a plain
 * string or an object keyed by locale ({ en: "...", id: "..." }). We prefer the
 * requested/default locale, then fall back to the first non-empty value.
 */
export function localize(
  value: LocalizedString | string | undefined | null,
  locale: string = DEFAULT_LOCALE,
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;

  if (value[locale]?.trim()) return value[locale];

  for (const candidate of Object.values(value)) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return "";
}
