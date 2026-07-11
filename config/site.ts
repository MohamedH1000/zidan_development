import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://zidandevelopments.com").replace(/\/$/, "");

/**
 * Central, type-safe site configuration.
 * Every page, the header, the footer and SEO defaults read from this single
 * source of truth so branding can be changed in one place.
 */
export const siteConfig = {
  name: "Zidan Development",
  shortName: "Zidan",
  legalName: "Zidan Development",
  // Arabic tagline used on the original brand identity.
  tagline: "تطور يحكي الواقع",
  taglineEn: "Development that narrates reality",

  // Brand showreel (same video as the original WordPress site).
  video: { youtubeId: "bH72vA8iHyg" },

  description:
    "Zidan Development is an Egyptian real estate developer building lasting value across New Cairo's most strategic districts — Al Narges, Bait Al Watan, Al Andalus, Lotus and beyond — through intelligent planning, precise execution and uncompromising quality.",

  /** Canonical production URL. Set NEXT_PUBLIC_SITE_URL when attaching a custom domain. */
  url: siteUrl,
  locale: "en_US",

  contact: {
    phone: "17534",
    phoneAlt: "17532",
    phoneDisplay: "17534",
    email: "info@zidandevelopments.com",
    careersEmail: "careers@zidandevelopments.com",
    address: {
      line: "New Cairo",
      city: "Cairo",
      country: "Egypt",
      region: "Fifth Settlement",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=New+Cairo+Fifth+Settlement+Cairo+Egypt",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=31.3800%2C29.9400%2C31.5600%2C30.1000&layer=mapnik&marker=30.0074%2C31.4913",
    hours: { en: "Saturday – Thursday · 9:00 – 18:00", ar: "السبت – الخميس · 9:00 – 18:00" },
  },
} as const;

/** Districts offered, with bilingual names + taglines. `slug` is the stable key. */
export const areas = [
  { slug: "al-andalus", en: "Al Andalus", ar: "الأندلس", tagline: { en: "Balanced family living", ar: "حياة عائلية متوازنة" } },
  { slug: "gardenia-heights", en: "Gardenia Heights", ar: "جاردينيا هايتس", tagline: { en: "Elevated, green & calm", ar: "مرتفعة وهادئة ومحاطة بالخضرة" } },
  { slug: "al-lotus", en: "Al Lotus", ar: "اللوتس", tagline: { en: "Premium & well-connected", ar: "رقي سكني قريب من كل الخدمات" } },
  { slug: "south-investors", en: "South Investors", ar: "المستثمرين الجنوبيين", tagline: { en: "Smart commercial yield", ar: "عائد تجاري ذكي" } },
  { slug: "bait-al-watan", en: "Bait Al Watan", ar: "بيت الوطن", tagline: { en: "Investment stronghold", ar: "منطقة استثمارية قوية" } },
  { slug: "al-takmely", en: "Al Takmely District", ar: "حي التكميلي", tagline: { en: "New-era growth zone", ar: "منطقة واعدة للنمو" } },
  { slug: "new-narges", en: "New Narges", ar: "النرجس الجديد", tagline: { en: "Established & in demand", ar: "راسخة وعالية الطلب" } },
  { slug: "fifth-settlement", en: "Fifth Settlement", ar: "التجمع الخامس", tagline: { en: "The heart of New Cairo", ar: "قلب القاهرة الجديدة" } },
] as const;

export type AreaSlug = (typeof areas)[number]["slug"];

export interface AreaSummary {
  slug: string;
  name: string;
  tagline: string;
}

export function getAreaName(slug: string, locale: Locale): string {
  const area = areas.find((a) => a.slug === slug);
  if (!area) return slug;
  return locale === "ar" ? area.ar : area.en;
}

export function getAreaSummaries(locale: Locale): AreaSummary[] {
  return areas.map((area) => ({
    slug: area.slug,
    name: locale === "ar" ? area.ar : area.en,
    tagline: pick(area.tagline, locale),
  }));
}

export function getAreaTags(locale: Locale): string[] {
  return areas.map((area) => (locale === "ar" ? area.ar : area.en));
}

/** Navigation. Labels are message keys resolved at render time. */
export type NavChild = { labelKey: string; href: string } | { areaSlug: string };

export interface NavItem {
  labelKey: string;
  href: string;
  children?: NavChild[];
}

export const navigation: NavItem[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "careers", href: "/careers" },
  {
    labelKey: "projects",
    href: "/projects",
    children: [
      { areaSlug: "new-narges" },
      { areaSlug: "bait-al-watan" },
      { areaSlug: "al-lotus" },
      { labelKey: "viewAll", href: "/projects" },
    ],
  },
  { labelKey: "delivery", href: "/delivery" },
  { labelKey: "blogs", href: "/blog" },
  { labelKey: "faqs", href: "/faqs" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin" | "x" | "youtube" | "tiktok";
}

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/zidandevelopments", icon: "facebook" },
  { label: "X", href: "https://x.com/zidan_develop", icon: "x" },
  { label: "Youtube", href: "https://www.youtube.com/@ZidanDevelopments", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zidan-developments/", icon: "linkedin" },
  { label: "TikTok", href: "https://www.tiktok.com/@zidan_developments", icon: "tiktok" },
];

export type SiteConfig = typeof siteConfig;
