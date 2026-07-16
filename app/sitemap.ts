import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(({ route, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, route)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
      alternates: alternates(route),
    })),
  );

  // Dynamic entries are sourced from the database so the sitemap only ever
  // advertises URLs that actually resolve. If the DB is unreachable, fall back
  // to the static routes alone — never ship dynamic URLs we can't verify.
  let projectEntries: MetadataRoute.Sitemap = [];
  let unitEntries: MetadataRoute.Sitemap = [];
  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    projectEntries = projects.flatMap(({ slug, updatedAt }) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, `/projects/${slug}`)),
        lastModified: updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: alternates(`/projects/${slug}`),
      })),
    );

    // Include individual unit pages so Google can index each floor-plan.
    const units = await prisma.unit.findMany({
      select: {
        slug: true,
        updatedAt: true,
        project: { select: { slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    unitEntries = units.flatMap(({ slug: unitSlug, updatedAt, project }) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, `/projects/${project.slug}/units/${unitSlug}`)),
        lastModified: updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.5,
        alternates: alternates(`/projects/${project.slug}/units/${unitSlug}`),
      })),
    );

    // Only PUBLISHED posts belong in the sitemap — drafts, scheduled and
    // archived articles must never be discoverable by crawlers.
    const posts = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: [{ publishedAt: "desc" }],
    });

    postEntries = posts.flatMap(({ slug, updatedAt, publishedAt }) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, `/blog/${slug}`)),
        lastModified: updatedAt ?? publishedAt ?? now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: alternates(`/blog/${slug}`),
      })),
    );
  } catch {
    // DB unreachable: ship the static routes only.
  }

  return [...staticEntries, ...projectEntries, ...unitEntries, ...postEntries];
}

export const revalidate = 86400; // refresh the sitemap daily.
