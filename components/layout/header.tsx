"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Globe, Menu, Phone, X, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navigation, siteConfig, getAreaName } from "@/config/site";
import { otherLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { buttonVariants } from "@/components/ui/button";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ projects = [] }: { projects?: { slug: string; name: string }[] }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;
  const targetLocale = otherLocale(locale as "en" | "ar");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-ink-900/8 bg-ivory/90 backdrop-blur-xl shadow-[0_8px_30px_-20px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo tone={solid ? "dark" : "light"} />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            const label = t(item.labelKey);
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    solid
                      ? active
                        ? "text-gold-700"
                        : "text-ink-700 hover:text-ink-900"
                      : active
                        ? "text-gold-400"
                        : "text-cream/80 hover:text-cream",
                  )}
                >
                  {label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  ) : null}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={openDropdown === item.href}
                  onClick={() => setOpenDropdown((prev) => (prev === item.href ? null : item.href))}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    solid
                      ? active
                        ? "text-gold-700"
                        : "text-ink-700 hover:text-ink-900"
                      : active
                        ? "text-gold-400"
                        : "text-cream/80 hover:text-cream",
                  )}
                >
                  {label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      openDropdown === item.href && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === item.href ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute start-1/2 top-full w-64 -translate-x-1/2 pt-3 rtl:translate-x-1/2"
                    >
                      <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white/95 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                        {/* Scrollable project list (from DB) */}
                        <div className="max-h-[280px] overflow-y-auto overscroll-contain p-2">
                          {projects.length > 0 ? (
                            projects.map((p) => (
                              <Link
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors",
                                  isActive(pathname, `/projects/${p.slug}`)
                                    ? "bg-gold-500/10 text-gold-700"
                                    : "text-ink-700 hover:bg-ink-900/5 hover:text-ink-900",
                                )}
                              >
                                {p.name}
                              </Link>
                            ))
                          ) : (
                            <p className="px-4 py-3 text-sm text-ink-400">No projects yet</p>
                          )}
                        </div>
                        {/* Always-visible "View all projects" */}
                        <div className="border-t border-ink-900/8 p-2">
                          <Link
                            href="/projects"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center justify-between rounded-xl bg-gold-500/8 px-4 py-2.5 text-sm font-semibold text-gold-700 transition-colors hover:bg-gold-500/15"
                          >
                            {t("viewAll")}
                            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA + language toggle */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={pathname}
            locale={targetLocale}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              solid
                ? "border-ink-900/15 text-ink-800 hover:border-gold-500 hover:text-gold-700"
                : "border-cream/25 text-cream hover:border-gold-400 hover:text-gold-400",
            )}
            aria-label={tCommon("languageLabel")}
          >
            <Globe className="h-3.5 w-3.5" />
            {tCommon("switchTo")}
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-colors",
              solid ? "text-ink-800 hover:text-gold-700" : "text-cream/90 hover:text-gold-400",
            )}
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phoneDisplay}
          </a>
          <Link href="/contact" className={buttonVariants({ variant: "gold", size: "sm" })}>
            {tCommon("getInTouch")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            solid ? "text-ink-900 hover:bg-ink-900/5" : "text-cream hover:bg-white/10",
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-900/8 bg-ivory lg:hidden"
          >
            <div className="flex max-h-[calc(100svh-5rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <div key={item.href} className="border-b border-ink-900/5 py-1 last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-2.5 text-base font-medium",
                        active ? "text-gold-700" : "text-ink-800",
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                    {item.href === "/projects" ? (
                      /* Projects dropdown: show DB projects + View all */
                      <div className="pb-2 ps-4">
                        <div className="max-h-[220px] overflow-y-auto overscroll-contain">
                          {projects.length > 0 ? (
                            projects.map((p) => (
                              <Link
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg py-1.5 text-sm text-ink-600 hover:text-gold-700"
                              >
                                {p.name}
                              </Link>
                            ))
                          ) : (
                            <p className="py-1.5 text-sm text-ink-400">No projects yet</p>
                          )}
                        </div>
                        <Link
                          href="/projects"
                          onClick={() => setMobileOpen(false)}
                          className="mt-1 flex items-center gap-1.5 rounded-lg py-1.5 text-sm font-semibold text-gold-700"
                        >
                          {t("viewAll")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    ) : item.children?.length ? (
                      <div className="flex flex-col gap-1 pb-2 ps-4">
                        {item.children.map((child) => {
                          const isArea = "areaSlug" in child;
                          const href = isArea ? `/projects/${child.areaSlug}` : child.href;
                          const childLabel = isArea ? getAreaName(child.areaSlug, locale as "en" | "ar") : t(child.labelKey);
                          return (
                            <Link
                              key={isArea ? child.areaSlug : child.href}
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-lg py-1.5 text-sm text-ink-600 hover:text-gold-700"
                            >
                              {childLabel}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={pathname}
                  locale={targetLocale}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-semibold text-ink-800"
                >
                  <Globe className="h-4 w-4" />
                  {tCommon("switchTo")}
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-3 text-sm font-medium text-ink-800"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={buttonVariants({ variant: "gold", size: "md", className: "mt-3" })}
              >
                {tCommon("getInTouch")}
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
