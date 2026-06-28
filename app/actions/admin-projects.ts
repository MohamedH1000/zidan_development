"use server";

import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProjectStatus } from "@prisma/client";

export type ProjectFormState = { error?: string } | undefined;

function str(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function lines(v: string): string[] {
  return v.split("\n").map((l) => l.trim()).filter(Boolean);
}
async function filesOf(fd: FormData, k: string): Promise<File[]> {
  return fd.getAll(k).filter((f): f is File => f instanceof File && f.size > 0);
}

const STATUSES = ["Available", "UnderConstruction", "Delivered", "ComingSoon"] as const;

export async function saveProject(_prev: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await requireAdmin();

  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (!slug) return { error: "Slug is required (e.g. new-narges)." };
  if (!str(formData, "nameEn") || !str(formData, "nameAr")) {
    return { error: "Project name is required in both EN and AR." };
  }

  const status = (STATUSES as readonly string[]).includes(str(formData, "status"))
    ? (str(formData, "status") as ProjectStatus)
    : "Available";

  let keepImages: string[] = [];
  try {
    keepImages = JSON.parse(str(formData, "keepImages") || "[]");
  } catch {
    keepImages = [];
  }

  try {
    const newFiles = await filesOf(formData, "images");
    const uploaded = await Promise.all(
      newFiles.map((f) => uploadToCloudinary(f, "zidan/projects")),
    );

    const renderFile = (await filesOf(formData, "render3d"))[0];
    const removeRender = formData.get("removeRender") === "on";
    const render3dUrl = renderFile
      ? await uploadToCloudinary(renderFile, "zidan/projects/render")
      : removeRender
        ? null
        : undefined;

    const data = {
      slug,
      status,
      featured: formData.get("featured") === "on",
      sortOrder: Number(str(formData, "sortOrder")) || 0,
      accent: str(formData, "accent") || null,
      nameEn: str(formData, "nameEn"),
      nameAr: str(formData, "nameAr"),
      shortNameEn: str(formData, "shortNameEn") || null,
      shortNameAr: str(formData, "shortNameAr") || null,
      taglineEn: str(formData, "taglineEn") || null,
      taglineAr: str(formData, "taglineAr") || null,
      summaryEn: str(formData, "summaryEn") || null,
      summaryAr: str(formData, "summaryAr") || null,
      descriptionEn: lines(str(formData, "descriptionEn")),
      descriptionAr: lines(str(formData, "descriptionAr")),
      districtEn: str(formData, "districtEn") || null,
      districtAr: str(formData, "districtAr") || null,
      downPaymentEn: str(formData, "downPaymentEn") || null,
      downPaymentAr: str(formData, "downPaymentAr") || null,
      installmentEn: str(formData, "installmentEn") || null,
      installmentAr: str(formData, "installmentAr") || null,
      deliveryEn: str(formData, "deliveryEn") || null,
      deliveryAr: str(formData, "deliveryAr") || null,
      projectAvailability: str(formData, "projectAvailability") || null,
      propertyStatus: str(formData, "propertyStatus") || null,
      deliveryDate: str(formData, "deliveryDate") || null,
      featuresLocationEn: lines(str(formData, "featuresLocationEn")),
      featuresLocationAr: lines(str(formData, "featuresLocationAr")),
      featuresProjectEn: lines(str(formData, "featuresProjectEn")),
      featuresProjectAr: lines(str(formData, "featuresProjectAr")),
      googleMapLink: str(formData, "googleMapLink") || null,
      mapEmbed: str(formData, "mapEmbed") || null,
      images: [...keepImages, ...uploaded],
      render3dUrl,
    };

    if (id) {
      await prisma.project.update({ where: { id }, data });
    } else {
      await prisma.project.create({ data });
    }
  } catch (error) {
    return { error: (error as Error).message || "Failed to save project." };
  }

  revalidatePath("/[locale]/projects", "page");
  revalidatePath("/[locale]", "page");
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  const project = await prisma.project.delete({ where: { id } });
  for (const url of project.images) await deleteFromCloudinary(url);
  if (project.render3dUrl) await deleteFromCloudinary(project.render3dUrl);
  revalidatePath("/[locale]/projects", "page");
  redirect("/admin/projects");
}
