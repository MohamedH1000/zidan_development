import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { projectSlugs } from "@/content/projects";
import { postSlugs } from "@/content/posts";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/i18n";

const staticRoutes = [
  { route: "", priority: 1 },
  { route: "/about", priority: 0.8 },
  { route: "/projects", priority: 0.9 },
  { route: "/delivery", priority: 0.7 },
  { route: "/blog", priority: 0.8 },
  { route: "/faqs", priority: 0.7 },
  { route: "/careers", priority: 0.6 },
  { route: "/contact", priority: 0.7 },
  { route: "/privacy", priority: 0.3 },
];

const locales: Locale[] = ["en", "ar"];

function alternates(path: string): { languages: Record<Locale, string> } {
  return {
    languages: {
      en: absoluteUrl(localizedPath("en", path)),
      ar: absoluteUrl(localizedPath("ar", path)),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(({ route, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, route)),
      lastModified: now,
      changeFrequency: "weekly",
      priority,
      alternates: alternates(route),
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `/projects/${slug}`)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates(`/projects/${slug}`),
    })),
  );

  const postEntries: MetadataRoute.Sitemap = postSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `/blog/${slug}`)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: alternates(`/blog/${slug}`),
    })),
  );

  return [...staticEntries, ...projectEntries, ...postEntries];
}

export const revalidate = 86400; // refresh the sitemap daily.
