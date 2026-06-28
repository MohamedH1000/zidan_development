import { v2 as cloudinary } from "cloudinary";

let configured = false;
function ensureConfig() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

/**
 * Upload a File (received in a Server Action) to Cloudinary under a folder.
 * Returns the secure URL to store in Postgres. Throws on failure.
 */
export async function uploadToCloudinary(
  file: File,
  folder = "zidan/projects",
): Promise<string> {
  ensureConfig();
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) reject(error ?? new Error("Cloudinary upload failed"));
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

/** Best-effort: extract the public id from a Cloudinary URL (for deletes). */
export function cloudinaryPublicId(url: string): string | null {
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+?)$/);
  return m ? m[1].replace(/\.[^.]+$/, "") : null;
}

/** Delete an asset from Cloudinary by URL (no-op if it fails). */
export async function deleteFromCloudinary(url: string): Promise<void> {
  const publicId = cloudinaryPublicId(url);
  if (!publicId) return;
  ensureConfig();
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // non-fatal
  }
}
