import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Building2, DoorOpen, Layers, Plug, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { getSpecs } from "@/content/specs";
import type { SpecIcon } from "@/types";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";

const icons: Record<SpecIcon, typeof Building2> = {
  structure: Layers,
  facade: Building2,
  entrance: DoorOpen,
  mep: Plug,
  security: ShieldCheck,
  comfort: Sparkles,
};

export async function DeliveryPreview() {
  const locale = (await getLocale()) as "en" | "ar";
  const categories = getSpecs(locale).categories;
  const t = await getTranslations("home.delivery");

  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/delivery" className={buttonVariants({ variant: "primary", size: "md" })}>
              {t("cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {categories.map((category) => {
            const Icon = icons[category.icon];
            return (
              <StaggerItem key={category.id}>
                <article className="flex h-full items-start gap-4 rounded-2xl border border-ink-900/8 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">{category.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{category.description}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
