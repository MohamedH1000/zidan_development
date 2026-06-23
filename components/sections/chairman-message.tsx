import { getLocale, getTranslations } from "next-intl/server";
import { getChairman } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export async function ChairmanMessage() {
  const locale = (await getLocale()) as "en" | "ar";
  const chairman = getChairman(locale);
  const t = await getTranslations("pages.about");

  return (
    <Section tone="dark">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal direction="right">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <div className="grain-overlay absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold-500/40">
                  <span className="font-script text-5xl text-gold-400">RZ</span>
                </div>
                <p className="font-display text-xl font-semibold text-cream">{chairman.name}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{chairman.role}</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-8 bg-gold-400/60" />
              {t("chairmanEyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl">
              {t("chairmanTitle")}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream/70 sm:text-base">
              {chairman.message.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-script text-3xl text-gold-400">{chairman.signature}</span>
              <span className="h-px w-12 bg-gold-500/40" />
              <span className="text-xs font-medium uppercase tracking-wide text-cream/60">{chairman.role}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
