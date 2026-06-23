import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { getProjects } from "@/content/projects";
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
          <div className="mt-10">
            <ProjectsExplorer projects={getProjects(activeLocale)} />
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
