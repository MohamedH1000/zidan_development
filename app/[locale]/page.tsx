import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { AreasStrip } from "@/components/sections/areas-strip";
import { Stats } from "@/components/sections/stats";
import { Excellence } from "@/components/sections/excellence";
import { VideoSection } from "@/components/sections/video-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Values } from "@/components/sections/values-section";
import { DeliveryPreview } from "@/components/sections/delivery-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { ContactSection } from "@/components/sections/contact-section";
import { getCompany } from "@/content/company";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

const KEYWORDS: Record<Locale, string[]> = {
  en: [
    "Zidan Development",
    "New Cairo real estate",
    "Fifth Settlement apartments",
    "Al Narges",
    "Bait Al Watan",
    "Al Andalus",
    "Lotus New Cairo",
    "apartments for sale New Cairo",
    "Egypt real estate developer",
    "Al Takmely",
  ],
  ar: [
    "زيدان للتطوير",
    "عقارات القاهرة الجديدة",
    "شقق التجمّع الخامس",
    "النرجس",
    "بيت الوطن",
    "الأندلس",
    "اللوتس",
    "شقق للبيع القاهرة الجديدة",
    "مطوّر عقاري مصر",
    "حي التكميلي",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = (locale as Locale) === "ar" ? "ar" : "en";
  const t = await getTranslations({ locale: activeLocale, namespace: "home" });
  const path = localizedPath(activeLocale, "/");

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    keywords: KEYWORDS[activeLocale],
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        en: absoluteUrl(localizedPath("en", "/")),
        ar: absoluteUrl(localizedPath("ar", "/")),
        "x-default": absoluteUrl(localizedPath("en", "/")),
      },
    },
    openGraph: {
      type: "website",
      locale: activeLocale === "ar" ? "ar_EG" : "en_US",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [absoluteUrl("/og.png")],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const company = getCompany(activeLocale);

  return (
    <>
      <Hero
        content={{
          headline: company.heroHeadline,
          subtitle: company.heroSubtitle,
          taglineAr: company.taglineAr,
          tagline: company.tagline,
        }}
      />
      <AreasStrip />
      <Stats />
      <Excellence />
      <VideoSection />
      <FeaturedProjects />
      <Values />
      <DeliveryPreview />
      <CtaBand />
      <ContactSection />
    </>
  );
}
