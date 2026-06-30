"use server";

import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type BlogFormState = { error?: string } | undefined;

function str(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function list(v: string): string[] {
  return v.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}
async function filesOf(fd: FormData, k: string): Promise<File[]> {
  return fd.getAll(k).filter((f): f is File => f instanceof File && f.size > 0);
}

const STATUSES = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"] as const;

export async function saveBlog(_prev: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const session = await requireAdmin();

  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (!slug) return { error: "Slug is required." };
  if (!str(formData, "titleEn") || !str(formData, "titleAr")) {
    return { error: "Title (EN + AR) is required." };
  }

  const rawBodyEn = str(formData, "bodyEn");
  if (!rawBodyEn) return { error: "English body is required." };

  const status = (STATUSES as readonly string[]).includes(str(formData, "status"))
    ? (str(formData, "status") as (typeof STATUSES)[number])
    : "DRAFT";
  const publishDateInput = str(formData, "publishedAt");
  const publishedAt = publishDateInput
    ? new Date(publishDateInput)
    : status === "PUBLISHED" ? new Date() : null;

  try {
    // Images
    const cover = (await filesOf(formData, "coverImage"))[0];
    const removeCover = formData.get("removeCover") === "on";
    const coverImageUrl = cover
      ? await uploadToCloudinary(cover, "zidan/blog/covers")
      : removeCover ? null : undefined;

    const og = (await filesOf(formData, "ogImage"))[0];
    const removeOg = formData.get("removeOg") === "on";
    const ogImageUrl = og
      ? await uploadToCloudinary(og, "zidan/blog/og")
      : removeOg ? null : undefined;

    let keepGallery: string[] = [];
    try { keepGallery = JSON.parse(str(formData, "keepGallery") || "[]"); } catch {}
    const newGallery = await filesOf(formData, "galleryImages");
    const galleryUploaded = await Promise.all(newGallery.map((f) => uploadToCloudinary(f, "zidan/blog/gallery")));

    // Authorship: keep existing author on edit, else the current user.
    const authorId = id ? str(formData, "authorId") || session.user.id : session.user.id;

    const data = {
      slug,
      authorId,
      status,
      featured: formData.get("featured") === "on",
      sortOrder: Number(str(formData, "sortOrder")) || 0,
      titleEn: str(formData, "titleEn"),
      titleAr: str(formData, "titleAr"),
      excerptEn: str(formData, "excerptEn") || null,
      excerptAr: str(formData, "excerptAr") || null,
      bodyEn: sanitizeBlogHtml(rawBodyEn),
      bodyAr: str(formData, "bodyAr") ? sanitizeBlogHtml(str(formData, "bodyAr")) : null,
      category: str(formData, "category") || null,
      tags: list(str(formData, "tags")),
      coverImageUrl,
      coverImageAltEn: str(formData, "coverImageAltEn") || null,
      coverImageAltAr: str(formData, "coverImageAltAr") || null,
      galleryImages: [...keepGallery, ...galleryUploaded],
      projectId: str(formData, "projectId") || null,
      readingTime: Number(str(formData, "readingTime")) || 5,
      publishedAt,
      allowComments: formData.get("allowComments") === "on",
      // SEO
      seoMetaTitleEn: str(formData, "seoMetaTitleEn") || null,
      seoMetaTitleAr: str(formData, "seoMetaTitleAr") || null,
      seoMetaDescriptionEn: str(formData, "seoMetaDescriptionEn") || null,
      seoMetaDescriptionAr: str(formData, "seoMetaDescriptionAr") || null,
      seoKeywordsEn: list(str(formData, "seoKeywordsEn")),
      seoKeywordsAr: list(str(formData, "seoKeywordsAr")),
      canonicalUrl: str(formData, "canonicalUrl") || null,
      // Social
      ogTitleEn: str(formData, "ogTitleEn") || null,
      ogTitleAr: str(formData, "ogTitleAr") || null,
      ogDescriptionEn: str(formData, "ogDescriptionEn") || null,
      ogDescriptionAr: str(formData, "ogDescriptionAr") || null,
      ogImageUrl,
      twitterCard: str(formData, "twitterCard") || null,
      twitterTitleEn: str(formData, "twitterTitleEn") || null,
      twitterTitleAr: str(formData, "twitterTitleAr") || null,
      twitterDescriptionEn: str(formData, "twitterDescriptionEn") || null,
      twitterDescriptionAr: str(formData, "twitterDescriptionAr") || null,
      twitterHandle: str(formData, "twitterHandle") || null,
    };

    if (id) {
      await prisma.blog.update({ where: { id }, data });
    } else {
      await prisma.blog.create({ data });
    }
  } catch (error) {
    return { error: (error as Error).message || "Failed to save blog post." };
  }

  revalidatePath("/en/blog");
  revalidatePath("/ar/blog");
  revalidatePath(`/en/blog/${slug}`);
  revalidatePath(`/ar/blog/${slug}`);
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string): Promise<void> {
  await requireAdmin();
  const blog = await prisma.blog.delete({ where: { id } });
  if (blog.coverImageUrl) await deleteFromCloudinary(blog.coverImageUrl);
  if (blog.ogImageUrl) await deleteFromCloudinary(blog.ogImageUrl);
  revalidatePath("/en/blog");
  revalidatePath("/ar/blog");
  revalidatePath(`/en/blog/${blog.slug}`);
  revalidatePath(`/ar/blog/${blog.slug}`);
  redirect("/admin/blogs");
}
