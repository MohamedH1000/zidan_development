"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";
import { faqCategories } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function FaqExplorer({ items }: { items: FaqItem[] }) {
  const t = useTranslations("faqCategories");
  const [category, setCategory] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  const visible = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {faqCategories.map((value) => {
          const active = category === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              aria-pressed={active}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "text-ink-950" : "text-ink-600 hover:text-ink-900",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="faq-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gold-500"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              {t(value)}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {visible.map((item) => {
          const isOpen = open === item.id;
          return (
            <div
              key={item.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-colors duration-300",
                isOpen ? "border-gold-500/40" : "border-ink-900/8",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
              >
                <span className="font-display text-base font-semibold text-ink-900 sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen ? "rotate-45 border-gold-500 bg-gold-500 text-ink-950" : "border-ink-900/15 text-ink-600",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
