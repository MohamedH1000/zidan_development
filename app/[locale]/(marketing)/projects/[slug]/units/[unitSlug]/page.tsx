import type { Metadata } from "next";
export const dynamicParams = true;
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, BedDouble, Bath, Maximize, Sofa, TreePalm, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getProjectBySlugFromDB } from "@/lib/db-content";
import { localizedPath } from "@/lib/i18n";
import { type Locale } from "@/i18n/routing";


export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; unitSlug: string }>;
}) {
  const { locale, slug, unitSlug } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;

  const [project, unit] = await Promise.all([
    getProjectBySlugFromDB(slug, activeLocale),
    prisma.unit.findFirst({ where: { slug: unitSlug, project: { slug } } }).catch(() => null),
  ]);

  if (!project || !unit) notFound();

  const pickField = (ar: string | null, en: string | null) =>
    activeLocale === "ar" ? (ar || en || "") : (en || "");
  const unitType = pickField(unit.unitTypeAr, unit.unitTypeEn);

  return (
    <>
      <Section tone="dark" className="pt-32 pb-10 sm:pt-40">
        <Container>
          <Reveal>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-cream/60 transition-colors hover:text-gold-400"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {project.name}
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
                {unit.slug}
              </h1>
              <Badge tone={unit.availability === "Available" ? "gold" : "neutral"}>
                {unit.availability}
              </Badge>
            </div>
            <p className="mt-2 text-lg text-cream/70">{unitType}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="max-w-4xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              {unit.planImageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-ink-900/8 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={unit.planImageUrl} alt={`${unit.slug} floor plan`} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-ink-900/8 bg-cream text-ink-400">
                  No floor plan available
                </div>
              )}
            </Reveal>

            <Reveal direction="left">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Specifications</h2>
              <dl className="mt-6 space-y-4">
                <Spec icon={Maximize} label="Area" value={`${unit.area} m²`} />
                {unit.bedrooms > 0 ? <Spec icon={BedDouble} label="Bedrooms" value={String(unit.bedrooms)} /> : null}
                {unit.bathrooms > 0 ? <Spec icon={Bath} label="Bathrooms" value={String(unit.bathrooms)} /> : null}
                {unit.livingRoom > 0 ? <Spec icon={Sofa} label="Living rooms" value={String(unit.livingRoom)} /> : null}
                {unit.gardenArea ? <Spec icon={TreePalm} label="Garden area" value={`${unit.gardenArea} m²`} /> : null}
              </dl>

              <div className="mt-8">
                <Link href="/contact" className={buttonVariants({ variant: "gold", size: "lg", className: "w-full" })}>
                  Enquire about this unit
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-ink-900/8 pb-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</dt>
        <dd className="font-display text-lg text-ink-900">{value}</dd>
      </div>
    </div>
  );
}
