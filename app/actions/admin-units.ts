"use server";

import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { UnitAvailability } from "@prisma/client";

export type UnitFormState = { error?: string } | undefined;

function str(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function num(fd: FormData, k: string): number | undefined {
  const v = str(fd, k);
  if (v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
async function filesOf(fd: FormData, k: string): Promise<File[]> {
  return fd.getAll(k).filter((f): f is File => f instanceof File && f.size > 0);
}

const AVAIL = ["Available", "Reserved", "Sold"] as const;

export async function saveUnit(_prev: UnitFormState, formData: FormData): Promise<UnitFormState> {
  await requireAdmin();

  const id = str(formData, "id");
  const projectId = str(formData, "projectId");
  const slug = str(formData, "slug");
  if (!projectId) return { error: "Select a project." };
  if (!slug) return { error: "Unit slug/code is required (e.g. D292-A1)." };
  if (!str(formData, "unitTypeEn") || !str(formData, "unitTypeAr")) {
    return { error: "Unit type is required in both EN and AR." };
  }

  const availability = (AVAIL as readonly string[]).includes(str(formData, "availability"))
    ? (str(formData, "availability") as UnitAvailability)
    : "Available";

  try {
    const planFile = (await filesOf(formData, "planImage"))[0];
    const removePlan = formData.get("removePlan") === "on";
    const planImageUrl = planFile
      ? await uploadToCloudinary(planFile, "zidan/units")
      : removePlan
        ? null
        : undefined;

    const data = {
      projectId,
      slug,
      availability,
      unitTypeEn: str(formData, "unitTypeEn"),
      unitTypeAr: str(formData, "unitTypeAr"),
      area: num(formData, "area") ?? 0,
      bedrooms: num(formData, "bedrooms") ?? 0,
      bathrooms: num(formData, "bathrooms") ?? 0,
      livingRoom: num(formData, "livingRoom") ?? 0,
      gardenArea: num(formData, "gardenArea") ?? null,
      sortOrder: num(formData, "sortOrder") ?? 0,
      planImageUrl,
    };

    if (id) {
      await prisma.unit.update({ where: { id }, data });
    } else {
      await prisma.unit.create({ data });
    }
  } catch (error) {
    return { error: (error as Error).message || "Failed to save unit." };
  }

  revalidatePath("/[locale]/projects", "page");
  redirect("/admin/units");
}

export async function deleteUnit(id: string): Promise<void> {
  await requireAdmin();
  const unit = await prisma.unit.delete({ where: { id } });
  if (unit.planImageUrl) await deleteFromCloudinary(unit.planImageUrl);
  revalidatePath("/[locale]/projects", "page");
  redirect("/admin/units");
}
