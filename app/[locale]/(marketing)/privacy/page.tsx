import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

const SECTION_KEYS = ["intro", "collect", "use", "security", "cookies", "rights"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return buildMetadata({
    title: t("title"),
    description: t("sections.intro.body"),
    path: localizedPath(locale as Locale, "/privacy"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.privacy");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("updated")}
        crumbs={[{ label: t("title") }]}
        sceneVariant="abstract"
      />
      <Section tone="light">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {SECTION_KEYS.map((key) => (
              <div key={key}>
                <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
                  {t(`sections.${key}.body`)}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-gold-500/20 bg-cream p-6">
              <h2 className="font-display text-xl font-semibold text-ink-900">{t("contactTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {t.rich("contactBody", {
                  emailAddr: siteConfig.contact.email,
                  phoneNum: siteConfig.contact.phoneDisplay,
                  email: (chunks) => (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-medium text-gold-700 underline underline-offset-2"
                    >
                      {chunks}
                    </a>
                  ),
                  phone: (chunks) => (
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-medium text-gold-700 underline underline-offset-2"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
