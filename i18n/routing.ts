import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for locale routing.
 * English is the default and served unprefixed (as-needed); Arabic lives
 * under /ar. Both locales share the same pathname structure.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const locales = routing.locales as readonly ["en", "ar"];
export type Locale = (typeof locales)[number];
