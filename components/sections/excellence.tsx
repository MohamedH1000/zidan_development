import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getCompany } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Scene } from "@/components/visual/scene";
import { buttonVariants } from "@/components/ui/button";

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

            <div className="mt-8 space-y-4">
              {company.pillars.map((group, index) => (
                <div key={index} className="flex flex-wrap gap-2">
                  {group.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gold-500/30 bg-white px-4 py-1.5 text-xs font-medium text-ink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <Link href="/about" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-8`}>
              {t("cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Reveal>

          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
              <Scene variant="hero" />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 start-6 hidden rounded-2xl border border-ink-900/8 bg-white p-5 shadow-xl sm:block">
              <div className="font-script text-2xl text-gold-500">{t("cardLabel")}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-500">{t("cardSub")}</div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
