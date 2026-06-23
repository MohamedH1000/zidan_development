import type { Locale } from "@/i18n/routing";

export type { Locale };

/** A string available in both supported languages. */
export type LocalizedString = { en: string; ar: string };

/** A paragraph/line list available in both supported languages. */
export type LocalizedStringList = { en: string[]; ar: string[] };

/** Resolve a localized string for the active locale (falls back to English). */
export function pick(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}

/** Resolve a localized string list for the active locale. */
export function pickList(value: LocalizedStringList, locale: Locale): string[] {
  return value[locale] ?? value.en;
}

export const isLocale = (value: unknown): value is Locale =>
  value === "en" || value === "ar";

/** Display name of a locale in its own language (for the toggle). */
export const localeName: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
};

/** Opposite locale — used by the header language switch. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

/**
 * Locale-aware path. English (default) is unprefixed; Arabic is prefixed /ar.
 * Pass the unprefixed path, e.g. localizedPath("ar", "/about") -> "/ar/about".
 */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
