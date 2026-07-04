import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getCompany } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

export async function AboutIntro() {
  const locale = (await getLocale()) as "en" | "ar";
  const company = getCompany(locale);
  const t = await getTranslations("pages.about");

  return (
    <Section tone="light">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <SectionHeading eyebrow={t("introEyebrow")} title={t("introTitle")} description={company.whoWeAre[0]} />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
              <p>{company.whoWeAre[1]}</p>
              <p>{company.whoWeAre[2]}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {company.pillars[2].map((tag) => (
                <Badge key={tag} tone="gold">
                  {tag}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
              <Image
                src="https://zidandevelopments.com/wp-content/uploads/2026/02/D292-750x580.jpeg"
                alt={company.tagline}
                width={750}
                height={580}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-6">
                <p className="font-script text-2xl text-gold-400" dir="rtl">{company.taglineAr}</p>
                <p className="text-sm text-cream/70">{company.tagline}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { ...company.mission, accent: "01" },
            { ...company.vision, accent: "02" },
          ].map((card, index) => (
            <Reveal key={card.title} delay={index * 0.1}>
              <article className="h-full rounded-2xl border border-ink-900/8 bg-cream p-8">
                <span className="font-display text-4xl font-semibold text-gold-500/40">{card.accent}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
