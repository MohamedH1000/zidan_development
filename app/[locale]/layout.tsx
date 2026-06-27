import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import "../globals.css";
import { locales } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { absoluteUrl, getOrganizationJsonLd } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { getCompany } from "@/content/company";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${company.tagline}`,
      description: siteConfig.description,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
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
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground selection:bg-gold-500 selection:text-ink-950">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={getOrganizationJsonLd()} />
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2 focus:text-sm focus:text-gold-400"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex flex-col">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
