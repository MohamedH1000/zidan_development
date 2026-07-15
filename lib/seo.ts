import type { Metadata } from "next";
import { siteConfig, areas } from "@/config/site";
import type { FaqItem } from "@/types";

/** Absolute URL helper — every canonical/OG URL must be absolute. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

function unlocalizePath(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/en" || cleanPath === "/ar") return "/";
  return cleanPath.replace(/^\/(en|ar)(?=\/)/, "");
}

function inferLocaleFromPath(path: string) {
  return path === "/ar" || path.startsWith("/ar/") ? "ar" : "en";
}

/** Build per-page metadata on top of the site-wide defaults. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const routePath = unlocalizePath(path);
  const locale = inferLocaleFromPath(path);
  const alternatePath = routePath === "/" ? "" : routePath;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(`/en${alternatePath}`),
        ar: absoluteUrl(`/ar${alternatePath}`),
        "x-default": absoluteUrl(`/en${alternatePath}`),
      },
    },
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: locale === "ar" ? "ar_EG" : siteConfig.locale,
      // Omit `images` so the file-based opengraph-image is inherited unless
      // a page explicitly supplies one.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ------------------------------- JSON-LD ------------------------------- */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: "Zidan Developments",
  url: siteConfig.url,
  logo: absoluteUrl("/icon.png"),
  description: siteConfig.description,
  telephone: `+20${siteConfig.contact.phone}`,
  email: siteConfig.contact.email,
  slogan: siteConfig.taglineEn,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    addressCountry: "EG",
  },
} as const;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: `+20${siteConfig.contact.phone}`,
  email: siteConfig.contact.email,
  image: absoluteUrl("/icon.png"),
  logo: absoluteUrl("/icon.png"),
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.region,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: "EG",
  },
  areaServed: areas.map((area) => area.en),
  openingHours: "Sa-Th 09:00-18:00",
} as const;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
} as const;

export function getOrganizationJsonLd() {
  return [organizationJsonLd, localBusinessJsonLd, websiteJsonLd];
}

export function getFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getArticleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  date: string;
  modifiedDate?: string;
  author: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.modifiedDate ?? article.date,
    author: { "@type": "Organization", name: article.author },
    ...(article.image ? { image: article.image } : {}),
    ...(article.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(article.path) },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
