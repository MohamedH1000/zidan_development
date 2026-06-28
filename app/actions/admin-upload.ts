"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin";

/**
 * Upload an image from the rich-text editor (or any admin widget) to Cloudinary
 * and return its public URL. Used by the TipTap image-insert toolbar button.
 */
export async function uploadBlogImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  try {
    const url = await uploadToCloudinary(file, "zidan/blog");
    return { url };
  } catch (error) {
    return { error: (error as Error).message || "Upload failed." };
  }
}
