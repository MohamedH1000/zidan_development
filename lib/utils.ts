import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 * The single source of truth for className composition across the app.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an integer with thousands separators. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Pluralize helper for simple content strings. */
export function pluralize(count: number, singular: string, plural?: string) {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

/** Locale-aware long date, e.g. "29 January 2026" / "٢٩ يناير ٢٠٢٦". */
export function formatDate(iso: string, locale: "en" | "ar"): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
