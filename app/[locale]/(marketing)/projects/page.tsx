import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { getProjectsFromDB } from "@/lib/db-content";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: localizedPath(locale as Locale, "/projects"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const t = await getTranslations("pages.projects");
  const tNav = await getTranslations("nav");

  let projects: Awaited<ReturnType<typeof getProjectsFromDB>> = [];
  try {
    projects = await getProjectsFromDB(activeLocale);
  } catch {
    projects = [];
  }

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: tNav("projects"), path: localizedPath(activeLocale, "/projects") },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[{ label: tNav("projects") }]}
        sceneVariant="project"
      />
      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={t("listEyebrow")}
              title={t("listTitle")}
              description={t("listDescription")}
            />
          </Reveal>
          {projects.length > 0 ? (
            <div className="mt-10">
              <ProjectsExplorer projects={projects} />
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-ink-900/8 bg-white p-12 text-center">
              <p className="text-sm text-ink-500">No projects available yet. Check back soon.</p>
            </div>
          )}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
