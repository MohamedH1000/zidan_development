import { getLocale } from "next-intl/server";
import { getStats } from "@/content/stats";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export async function Stats() {
  const locale = (await getLocale()) as "en" | "ar";
  const stats = getStats(locale);

  return (
    <Section tone="dark" className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08} className="text-center lg:text-start">
              <div className="font-display text-4xl font-semibold text-gold-400 sm:text-5xl">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-cream">
                {stat.label}
              </div>
              {stat.description ? (
                <p className="mt-1.5 text-xs leading-relaxed text-cream/55">{stat.description}</p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
