import { prisma } from "@/lib/prisma";
import type { Locale } from "@/i18n/routing";
import type { ProjectArea, BlogPost, UnitCardData } from "@/types";
import type { Project, Blog, Unit } from "@prisma/client";

// ── Helpers ──────────────────────────────────────────────────────────────

/** Pick the locale-specific field, falling back to English, then empty string. */
function pick(ar: string | null | undefined, en: string | null | undefined, locale: Locale): string {
  if (locale === "ar") return ar || en || "";
  return en || "";
}

/** Pick a string array, falling back. */
function pickList(ar: string[] | null | undefined, en: string[] | null | undefined, locale: Locale): string[] {
  if (locale === "ar") return ar?.length ? ar : en ?? [];
  return en ?? [];
}

/** Map the Prisma ProjectStatus enum to the display string (with spaces). */
function mapStatus(s: string): ProjectArea["status"] {
  return s.replace(/([A-Z])/g, " $1").trim() as ProjectArea["status"];
}

// ── Project mappers ──────────────────────────────────────────────────────

type ProjectWithUnits = Project & { units: Pick<Unit, "unitTypeEn" | "unitTypeAr">[] };

function mapProject(p: ProjectWithUnits, locale: Locale): ProjectArea {
  const unitTypes = Array.from(
    new Set(p.units.map((u) => pick(u.unitTypeAr, u.unitTypeEn, locale))),
  ).filter(Boolean).slice(0, 3);

  return {
    slug: p.slug,
    name: pick(p.nameAr, p.nameEn, locale),
    shortName: pick(p.shortNameAr, p.shortNameEn || p.nameAr, locale) || pick(p.shortNameAr, p.shortNameEn, locale),
    tagline: pick(p.taglineAr, p.taglineEn, locale),
    summary: pick(p.summaryAr, p.summaryEn, locale),
    description: pickList(p.descriptionAr, p.descriptionEn, locale),
    district: pick(p.districtAr, p.districtEn, locale),
    status: mapStatus(p.status),
    unitTypes,
    downPayment: pick(p.downPaymentAr, p.downPaymentEn, locale),
    installment: pick(p.installmentAr, p.installmentEn, locale),
    delivery: pick(p.deliveryAr, p.deliveryEn, locale),
    highlights: pickList(p.featuresProjectAr, p.featuresProjectEn, locale),
    accent: p.accent || "#c8a45c",
    featured: p.featured,
    // DB-extended fields
    images: p.images ?? [],
    render3dUrl: p.render3dUrl,
    googleMapLink: p.googleMapLink,
    mapEmbed: p.mapEmbed,
    mapLat: p.mapLat,
    mapLng: p.mapLng,
    projectAvailability: p.projectAvailability,
    propertyStatus: p.propertyStatus,
    deliveryDate: p.deliveryDate,
    featuresLocation: pickList(p.featuresLocationAr, p.featuresLocationEn, locale),
  };
}

export async function getProjectsFromDB(locale: Locale): Promise<ProjectArea[]> {
  const rows = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { units: { select: { unitTypeEn: true, unitTypeAr: true } } },
  });
  return rows.map((p) => mapProject(p as ProjectWithUnits, locale));
}

export async function getProjectBySlugFromDB(slug: string, locale: Locale): Promise<ProjectArea | undefined> {
  const p = await prisma.project.findUnique({
    where: { slug },
    include: { units: { select: { unitTypeEn: true, unitTypeAr: true } } },
  });
  return p ? mapProject(p as ProjectWithUnits, locale) : undefined;
}

export async function getFeaturedProjectsFromDB(locale: Locale): Promise<ProjectArea[]> {
  const rows = await prisma.project.findMany({
    where: { featured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { units: { select: { unitTypeEn: true, unitTypeAr: true } } },
  });
  return rows.map((p) => mapProject(p as ProjectWithUnits, locale));
}

// ── Blog mappers ─────────────────────────────────────────────────────────

type BlogWithAuthor = Blog & {
  author: { name: string | null; email: string } | null;
  project?: { slug: string; nameEn: string; nameAr: string } | null;
};

function publicBlogWhere() {
  return {
    status: "PUBLISHED" as const,
    OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }],
  };
}

function mapBlog(b: BlogWithAuthor, locale: Locale): BlogPost {
  return {
    slug: b.slug,
    title: pick(b.titleAr, b.titleEn, locale),
    excerpt: pick(b.excerptAr, b.excerptEn, locale),
    content: [], // Unused — blog detail renders bodyHtml (rich HTML)
    category: b.category || "",
    author: b.author?.name || b.author?.email || "Zidan Development",
    date: (b.publishedAt ?? b.createdAt).toISOString(),
    readingTime: `${b.readingTime} ${locale === "ar" ? "دقائق قراءة" : "min read"}`,
    tags: b.tags ?? [],
    featured: b.featured,
    bodyHtml: locale === "ar" ? (b.bodyAr || b.bodyEn) : b.bodyEn,
    coverImageUrl: b.coverImageUrl,
    coverImageAlt: pick(b.coverImageAltAr, b.coverImageAltEn, locale) || undefined,
    galleryImages: b.galleryImages ?? [],
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    seoTitle: pick(b.seoMetaTitleAr, b.seoMetaTitleEn, locale) || undefined,
    seoDescription: pick(b.seoMetaDescriptionAr, b.seoMetaDescriptionEn, locale) || undefined,
    seoKeywords: pickList(b.seoKeywordsAr, b.seoKeywordsEn, locale),
    ogTitle: pick(b.ogTitleAr, b.ogTitleEn, locale) || undefined,
    ogDescription: pick(b.ogDescriptionAr, b.ogDescriptionEn, locale) || undefined,
    ogImageUrl: b.ogImageUrl,
    twitterTitle: pick(b.twitterTitleAr, b.twitterTitleEn, locale) || undefined,
    twitterDescription: pick(b.twitterDescriptionAr, b.twitterDescriptionEn, locale) || undefined,
    twitterCard: b.twitterCard,
    twitterHandle: b.twitterHandle,
    canonicalUrl: b.canonicalUrl,
    relatedProject: b.project
      ? {
          slug: b.project.slug,
          name: pick(b.project.nameAr, b.project.nameEn, locale),
        }
      : null,
    viewCount: b.viewCount,
    allowComments: b.allowComments,
  };
}

export async function getBlogsFromDB(locale: Locale): Promise<BlogPost[]> {
  const rows = await prisma.blog.findMany({
    where: publicBlogWhere(),
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { name: true, email: true } },
      project: { select: { slug: true, nameEn: true, nameAr: true } },
    },
  });
  return rows.map((b) => mapBlog(b as BlogWithAuthor, locale));
}

export async function getBlogBySlugFromDB(slug: string, locale: Locale): Promise<BlogPost | undefined> {
  const b = await prisma.blog.findFirst({
    where: { ...publicBlogWhere(), slug },
    include: {
      author: { select: { name: true, email: true } },
      project: { select: { slug: true, nameEn: true, nameAr: true } },
    },
  });
  return b ? mapBlog(b as BlogWithAuthor, locale) : undefined;
}

export async function getFeaturedBlogFromDB(locale: Locale): Promise<BlogPost | undefined> {
  const rows = await prisma.blog.findMany({
    where: { ...publicBlogWhere(), featured: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { name: true, email: true } },
      project: { select: { slug: true, nameEn: true, nameAr: true } },
    },
    take: 1,
  });
  if (rows.length > 0) return mapBlog(rows[0] as BlogWithAuthor, locale);
  // Fallback: latest published post
  const latest = await prisma.blog.findFirst({
    where: publicBlogWhere(),
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: {
      author: { select: { name: true, email: true } },
      project: { select: { slug: true, nameEn: true, nameAr: true } },
    },
  });
  return latest ? mapBlog(latest as BlogWithAuthor, locale) : undefined;
}

// ── Unit queries ─────────────────────────────────────────────────────────

export async function getUnitsForProjectDB(projectId: string, locale: Locale): Promise<UnitCardData[]> {
  const rows = await prisma.unit.findMany({
    where: { projectId },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return rows.map((u) => ({
    slug: u.slug,
    unitType: pick(u.unitTypeAr, u.unitTypeEn, locale),
    area: u.area,
    bedrooms: u.bedrooms,
    bathrooms: u.bathrooms,
    livingRoom: u.livingRoom,
    gardenArea: u.gardenArea,
    availability: u.availability,
    planImageUrl: u.planImageUrl,
  }));
}

export async function getUnitBySlugDB(unitSlug: string, projectId: string, locale: Locale): Promise<(UnitCardData & { id: string }) | undefined> {
  const u = await prisma.unit.findFirst({ where: { slug: unitSlug, projectId } });
  if (!u) return undefined;
  return {
    id: u.id,
    slug: u.slug,
    unitType: pick(u.unitTypeAr, u.unitTypeEn, locale),
    area: u.area,
    bedrooms: u.bedrooms,
    bathrooms: u.bathrooms,
    livingRoom: u.livingRoom,
    gardenArea: u.gardenArea,
    availability: u.availability,
    planImageUrl: u.planImageUrl,
  };
}
