import type { Locale } from "@/i18n/routing";

export type { Locale };

/** A string available in both supported languages. */
export type LocalizedString = { en: string; ar: string };

/** A paragraph/line list available in both supported languages. */
export type LocalizedStringList = { en: string[]; ar: string[] };

/**
 * Arabic house style: sentences must not end with a trailing full stop. We strip
 * a single trailing "." (plus surrounding whitespace) from Arabic strings only.
 * Applied centrally in pick()/pickList() so all bilingual content is consistent.
 */
function trimArabicPeriod(value: string, locale: Locale): string {
  if (locale !== "ar") return value;
  return value.replace(/\s*\.+\s*$/, "");
}

/** Resolve a localized string for the active locale (falls back to English). */
export function pick(value: LocalizedString | null | undefined, locale: Locale): string {
  if (!value) return "";
  const selected = value[locale] ?? value.en ?? "";
  return trimArabicPeriod(selected, locale);
}

/** Resolve a localized string list for the active locale. */
export function pickList(value: LocalizedStringList, locale: Locale): string[] {
  const list = value[locale] ?? value.en;
  return locale === "ar" ? list.map((item) => trimArabicPeriod(item, locale)) : list;
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
 * Locale-aware path. With `localePrefix: "always"`, BOTH locales are prefixed.
 * Pass the unprefixed path, e.g. localizedPath("ar", "/about") -> "/ar/about",
 * localizedPath("en", "/") -> "/en".
 */
export function localizedPath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
