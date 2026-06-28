import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Scene } from "@/components/visual/scene";
import { ProjectCard } from "@/components/sections/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getProjects, projectSlugs } from "@/content/projects";
import { siteConfig } from "@/config/site";
import { buildMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import { locales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = locale as Locale;
  const project = getProjectBySlug(slug, activeLocale);
  if (!project) return buildMetadata({ title: "Project not found", description: "", path: localizedPath(activeLocale, "/projects") });

  return buildMetadata({
    title: `${project.name}`,
    description: project.summary,
    path: localizedPath(activeLocale, `/projects/${project.slug}`),
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const project = getProjectBySlug(slug, activeLocale);
  if (!project) notFound();

  const t = await getTranslations("project");
  const tNav = await getTranslations("nav");
  const others = getProjects(activeLocale).filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: tNav("projects"), path: localizedPath(activeLocale, "/projects") },
          { name: project.name, path: localizedPath(activeLocale, `/projects/${project.slug}`) },
        ])}
      />
      <PageHero
        eyebrow={project.district}
        title={project.name}
        description={project.tagline}
        crumbs={[
          { label: tNav("projects"), href: localizedPath(activeLocale, "/projects") },
          { label: project.name },
        ]}
        sceneVariant="project"
      />

      <Section tone="light">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal direction="right">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
                <Scene variant="project" accent={project.accent} showLabel={project.name} />
              </div>
              <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-600 sm:text-base">
                {project.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900">{t("highlights")}</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-ink-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="left">
              <aside className="sticky top-28 rounded-2xl border border-ink-900/8 bg-cream p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-500">
                  <MapPin className="h-3.5 w-3.5 text-gold-600" />
                  {project.district}
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900">{project.name}</h2>
                <p className="mt-2 text-sm text-ink-500">{project.summary}</p>

                <dl className="mt-6 space-y-3 border-t border-ink-900/10 pt-6">
                  <SpecRow label={t("specStatus")} value={t(`status.${project.status}`)} />
                  <SpecRow label={t("specDown")} value={project.downPayment} />
                  <SpecRow label={t("specInstallment")} value={project.installment} />
                  <SpecRow label={t("specDelivery")} value={project.delivery} />
                </dl>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t("unitTypes")}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.unitTypes.map((type) => (
                      <Badge key={type} tone="gold">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "gold", size: "lg", className: "mt-8 w-full" })}
                >
                  {t("enquire", { name: project.shortName })} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="mt-3 block text-center text-sm font-medium text-ink-600 hover:text-gold-700"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">{t("exploreOther")}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <Reveal key={other.slug}>
                <ProjectCard project={other} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-semibold text-ink-900">{value}</dd>
    </div>
  );
}
