"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Scene } from "@/components/visual/scene";
import { buttonVariants } from "@/components/ui/button";

export function Hero({
  content,
}: {
  content: {
    headline: string[];
    subtitle: string;
    taglineAr: string;
    tagline: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tCommon = useTranslations("common");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 text-cream">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Scene variant="hero" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
      <div className="grain-overlay absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-32 sm:px-8 lg:px-12">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            <span className="h-px w-8 bg-gold-400/60" />
            <span dir="rtl">{content.taglineAr}</span>
            <span className="text-cream/40">·</span>
            <span>{content.tagline}</span>
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {content.headline[0]}
            <br />
            <span className="text-gold-gradient">{content.headline[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {content.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/projects" className={buttonVariants({ variant: "gold", size: "lg" })}>
              {tCommon("exploreAvailability")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "border-cream/30 text-cream hover:bg-cream hover:text-ink-950 hover:border-cream",
              })}
            >
              <Phone className="h-4 w-4" /> {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <motion.span
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-gold-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
