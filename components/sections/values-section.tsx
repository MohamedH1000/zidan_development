import { getLocale, getTranslations } from "next-intl/server";
import { getValues } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export async function Values() {
  const locale = (await getLocale()) as "en" | "ar";
  const values = getValues(locale);
  const t = await getTranslations("home.values");

  return (
    <Section tone="dark">
      <Container>
        <SectionHeading tone="dark" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
          {values.map((value) => (
            <StaggerItem key={value.id}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors duration-500 hover:border-gold-500/40">
                <span className="font-display text-5xl font-semibold text-gold-500/30 transition-colors duration-500 group-hover:text-gold-500/60">
                  {value.index}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-cream">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{value.description}</p>
                <span className="mt-6 block h-px w-12 bg-gold-500/40" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
