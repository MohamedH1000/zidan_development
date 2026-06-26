import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for locale routing.
 * English is the default and served unprefixed (as-needed); Arabic lives
 * under /ar. Both locales share the same pathname structure.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Every URL carries an explicit locale prefix (/en, /ar). This makes the URL
  // the single source of truth for locale — a stale NEXT_LOCALE cookie can no
  // longer redirect an unprefixed path (which previously made the logo link
  // flip the language under "as-needed").
  localePrefix: "always",
  localeDetection: false,
});

export const locales = routing.locales as readonly ["en", "ar"];
export type Locale = (typeof locales)[number];
