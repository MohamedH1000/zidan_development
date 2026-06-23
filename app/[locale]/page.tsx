import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { AreasStrip } from "@/components/sections/areas-strip";
import { Stats } from "@/components/sections/stats";
import { Excellence } from "@/components/sections/excellence";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Values } from "@/components/sections/values-section";
import { DeliveryPreview } from "@/components/sections/delivery-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { ContactSection } from "@/components/sections/contact-section";
import { getCompany } from "@/content/company";
import type { Locale } from "@/i18n/routing";

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
      <FeaturedProjects />
      <Values />
      <DeliveryPreview />
      <CtaBand />
      <ContactSection />
    </>
  );
}
