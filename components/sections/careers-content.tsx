import { getTranslations } from "next-intl/server";
import { ArrowRight, Compass, Hammer, HeartHandshake, Trophy } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { CareersForm } from "@/components/forms/careers-form";

const PERK_KEYS = ["build", "culture", "direction", "grow"] as const;
const PERK_ICONS = { build: Hammer, culture: Trophy, direction: Compass, grow: HeartHandshake };

export async function CareersContent() {
  const t = await getTranslations("pages.careers");

  return (
    <>
      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t("cultureEyebrow")}
              title={t("cultureTitle")}
              description={t("cultureDescription")}
              align="center"
            />
          </Reveal>
          <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {PERK_KEYS.map((key) => {
              const Icon = PERK_ICONS[key];
              return (
                <StaggerItem key={key}>
                  <article className="h-full rounded-2xl border border-ink-900/8 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{t(`perks.${key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{t(`perks.${key}.body`)}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section tone="cream" id="apply">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right">
              <div className="space-y-6">
                <SectionHeading eyebrow={t("applyEyebrow")} title={t("applyTitle")} description={t("applyDescription")} />
                <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-ink-950 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]">
                  <img
                    src="https://zidandevelopments.com/freepik__a-closeup-black-and-white-shot-shows-a-persons-han__74287/"
                    alt="Career opportunity at Zidan Developments"
                    className="h-56 w-full object-cover object-center sm:h-64"
                  />
                </div>
                <ul className="space-y-4 text-sm text-ink-600">
                  {(["review", "formats", "privacy"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 rtl:rotate-180" />
                      <span>{t(`applyPoints.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] sm:p-8">
                <CareersForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
