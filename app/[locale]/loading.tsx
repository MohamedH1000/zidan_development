import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/logo";

/**
 * Route-level loading UI (Next.js `loading.tsx` convention). One file wraps
 * every page under `[locale]` — home, about, projects, blog, contact, careers,
 * and admin — in a Suspense boundary, showing this cinematic fallback while the
 * route's content streams in. It is most visible on DB-backed pages
 * (project/blog detail, featured projects) and client-side navigations to
 * not-yet-cached routes.
 *
 * CSS-only animation (no `"use client"`) keeps it instant and hydration-free.
 * The global `prefers-reduced-motion` rule in globals.css collapses the sweep;
 * the faint gold track stays visible either way, so the loader is never empty.
 */
export default async function Loading() {
  const t = await getTranslations("common");

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-9 bg-ink-950"
    >
      <Logo tone="light" href={null} className="animate-loader-fade-in" />
      <span
        aria-hidden="true"
        className="relative block h-[2px] w-40 overflow-hidden rounded-full bg-gold-500/25"
      >
        <span className="absolute inset-y-0 left-0 w-1/2 animate-loader-sweep bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      </span>
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}
