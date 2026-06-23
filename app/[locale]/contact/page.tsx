import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { ContactSection } from "@/components/sections/contact-section";
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
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: localizedPath(locale as Locale, "/contact"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const t = await getTranslations("pages.contact");

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: t("eyebrow"), path: localizedPath(activeLocale, "/contact") },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[{ label: t("eyebrow") }]}
        sceneVariant="abstract"
      />
      <ContactSection />
    </>
  );
}
