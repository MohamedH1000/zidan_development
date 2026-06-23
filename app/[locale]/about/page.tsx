import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { Stats } from "@/components/sections/stats";
import { Values } from "@/components/sections/values-section";
import { ChairmanMessage } from "@/components/sections/chairman-message";
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
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: localizedPath(locale as Locale, "/about"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const t = await getTranslations("pages.about");
  const tNav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: tNav("about"), path: localizedPath(activeLocale, "/about") },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[{ label: tNav("about") }]}
        sceneVariant="abstract"
      />
      <AboutIntro />
      <Stats />
      <Values />
      <ChairmanMessage />
      <CtaBand />
    </>
  );
}
