"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { otherLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Admin language toggle — mirrors the marketing site's, scoped to admin copy. */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("admin.common");
  const pathname = usePathname();
  const target = otherLocale(locale as "en" | "ar");

  return (
    <Link
      href={pathname}
      locale={target}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink-200 transition-colors hover:border-gold-500 hover:text-gold-400",
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5" />
      {t("switchTo")}
    </Link>
  );
}
