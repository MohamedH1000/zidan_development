import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FaqExplorer } from "@/components/sections/faq-explorer";
import { getFaqs } from "@/content/faqs";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { buildMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.faqs" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: localizedPath(locale as Locale, "/faqs"),
  });
}

export default async function FaqsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const t = await getTranslations("pages.faqs");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const faqs = getFaqs(activeLocale);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: tNav("faqs"), path: localizedPath(activeLocale, "/faqs") },
          ]),
          getFaqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[{ label: tNav("faqs") }]}
        sceneVariant="abstract"
      />
      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t("browseEyebrow")} title={t("browseTitle")} align="center" />
          </Reveal>
          <div className="mt-10">
            <FaqExplorer items={faqs} />
          </div>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-gold-500/20 bg-white p-10 text-center">
            <h2 className="max-w-xl font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              {t("shortlistTitle")}
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-ink-600">{t("shortlistBody")}</p>
            <Link href="/contact" className={buttonVariants({ variant: "gold", size: "lg" })}>
              {tCommon("contactNow")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
