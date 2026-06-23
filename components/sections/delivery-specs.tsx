import { getLocale } from "next-intl/server";
import { Building2, DoorOpen, Layers, Plug, ShieldCheck, Sparkles } from "lucide-react";
import { getSpecs } from "@/content/specs";
import type { SpecIcon } from "@/types";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const icons: Record<SpecIcon, typeof Building2> = {
  structure: Layers,
  facade: Building2,
  entrance: DoorOpen,
  mep: Plug,
  security: ShieldCheck,
  comfort: Sparkles,
};

export async function DeliverySpecs() {
  const locale = (await getLocale()) as "en" | "ar";
  const { intro, categories } = getSpecs(locale);

  return (
    <>
      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={intro.title} title={intro.subtitle} description={intro.body[0]} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-500">{intro.body[1]}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" className="pt-0">
        <Container>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
            {categories.map((category) => {
              const Icon = icons[category.icon];
              return (
                <StaggerItem key={category.id}>
                  <article className="h-full rounded-2xl border border-ink-900/8 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-ink-900">{category.title}</h3>
                        <p className="mt-1 text-sm text-ink-500">{category.description}</p>
                      </div>
                    </div>
                    <ul className="mt-5 grid grid-cols-1 gap-2 border-t border-ink-900/8 pt-5 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
