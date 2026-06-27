import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getCompany } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { MovingTags } from "./moving-tags";

export async function Excellence() {
  const locale = (await getLocale()) as "en" | "ar";
  const company = getCompany(locale);
  const t = await getTranslations("home.excellence");

  return (
    <Section tone="cream">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              <span className="h-px w-8 bg-gold-500/60" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">{company.whoWeAre[0]}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">{company.whoWeAre[2]}</p>

            <Link href="/about" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-8`}>
              {t("cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Reveal>

          {/* Animated keyword wall — replaces the architectural SVG, mirroring
              the floating value tags on the original WordPress site. */}
          <Reveal direction="left" className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-b from-white to-cream p-6 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.4)] sm:p-8">
              {/* soft gold glow behind the moving tags */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,rgba(200,164,92,0.16),transparent_55%)]"
              />
              <div className="relative">
                <MovingTags rows={company.pillars} />
              </div>
              <div className="relative mt-6 flex items-center justify-center gap-2 text-center">
                <span className="font-script text-2xl text-gold-500">{t("cardLabel")}</span>
                <span className="h-px w-8 bg-gold-500/40" />
                <span className="text-xs font-medium uppercase tracking-wide text-ink-500">{t("cardSub")}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
