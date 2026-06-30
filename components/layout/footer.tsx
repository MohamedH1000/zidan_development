import { getLocale, getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAreaSummaries, navigation, siteConfig, socialLinks } from "@/config/site";
import { prisma } from "@/lib/prisma";
import { Logo } from "./logo";
import type { SocialIcon } from "@/types";

/* Brand glyphs as inline SVG — lucide dropped brand icons, so we ship our own. */
const socialIcons: Record<SocialIcon, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M14.5 2h2.6c.2 2.2 1.5 3.6 4 4.2v3.2c-1.7.2-3.3-.4-4.8-1.3v5.6a6.3 6.3 0 1 1-6.3-6.3c.3 0 .6 0 1 .1v3.2a3.2 3.2 0 1 0 2.2 3.1V2Z" />
    </svg>
  ),
};

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const year = new Date().getFullYear();
  let areas: { slug: string; name: string }[] = [];
  try {
    const rows = await prisma.project.findMany({
      take: 8,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { slug: true, nameEn: true, nameAr: true },
    });
    areas = rows.map((p) => ({
      slug: p.slug,
      name: locale === "ar" ? (p.nameAr || p.nameEn) : p.nameEn,
    }));
  } catch {
    areas = getAreaSummaries(locale as "en" | "ar").slice(0, 8);
  }

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-cream">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Top CTA band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div>
            <p className="font-script text-2xl text-gold-400">{t("ctaScript")}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{t("ctaTitle")}</h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gold-500 px-7 text-sm font-medium text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            {tCommon("requestCallBack")}
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <Logo tone="light" href="/" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">{t("description")}</p>
          <p className="mt-5 font-script text-xl text-gold-400" dir={locale === "ar" ? "rtl" : "ltr"}>
            {t("tagline")}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-400"
              >
                {socialIcons[social.icon]}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t("explore")}</h4>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/70 transition-colors hover:text-gold-400">
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t("districts")}</h4>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/projects/${area.slug}`}
                  className="text-sm text-cream/70 transition-colors hover:text-gold-400"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t("contact")}</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-start gap-3 text-cream/70 transition-colors hover:text-gold-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-3 break-all text-cream/70 transition-colors hover:text-gold-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </li>
            <li>
              <a href={siteConfig.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-cream/70 transition-colors hover:text-gold-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  {siteConfig.contact.address.region}, {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-cream/70">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{siteConfig.contact.hours[locale as "en" | "ar"]}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:px-8 lg:px-12">
          <p>© {year} {siteConfig.name}. {t("rights")}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-gold-400">{t("privacy")}</Link>
            <Link href="/faqs" className="transition-colors hover:text-gold-400">{tNav("faqs")}</Link>
            <Link href="/contact" className="transition-colors hover:text-gold-400">{tCommon("getInTouch")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
