import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo, Great_Vibes } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "../globals.css";
import { locales } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { absoluteUrl, getOrganizationJsonLd } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { getCompany } from "@/content/company";

// English UI/display: Plus Jakarta Sans (clean, well-structured geometric sans).
// Arabic: Cairo (modern, legible). The font stack falls through per-glyph, so
// Latin text renders in Jakarta and Arabic glyphs in Cairo automatically. The
// explicit html[lang="ar"] rule in globals.css forces Cairo on Arabic pages so
// it applies reliably across all browsers/devices (not just via stack fallback).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const arabic = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const greatVibes = Great_Vibes({ subsets: ["latin"], variable: "--font-great-vibes", display: "swap", weight: ["400"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = (locale === "ar" ? "ar" : "en") as (typeof locales)[number];
  const company = getCompany(activeLocale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${company.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: absoluteUrl(localizedPath(activeLocale, "/")),
      languages: {
        en: absoluteUrl(localizedPath("en", "/")),
        ar: absoluteUrl(localizedPath("ar", "/")),
        "x-default": absoluteUrl(localizedPath("en", "/")),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: absoluteUrl(localizedPath(activeLocale, "/")),
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${company.tagline}`,
      description: siteConfig.description,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@zidan_develop",
      title: `${siteConfig.name} — ${company.tagline}`,
      description: siteConfig.description,
      images: [absoluteUrl("/og.png")],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    category: "real estate",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  const activeLocale = locale as (typeof locales)[number];

  // Enable static rendering for this locale.
  setRequestLocale(activeLocale);
  const dir = activeLocale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <html
      lang={activeLocale}
      dir={dir}
      className={`${jakarta.variable} ${arabic.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-background font-sans text-foreground selection:bg-gold-500 selection:text-ink-950"
        // Browser extensions (e.g. password/anti-phishing toolbars) inject
        // attributes onto <body> at load, which React flags as a hydration
        // mismatch. suppressHydrationWarning silences that false positive on
        // this element only — children are still checked normally.
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={getOrganizationJsonLd()} />
          <ScrollProgress />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
