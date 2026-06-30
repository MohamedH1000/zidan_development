import { z } from "zod";

/**
 * Validation contract for the careers application form.
 * File data is validated separately (name + size) because formData entries
 * for uploads arrive as File objects on the server.
 */
export const careersSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(32)
    .refine((value) => value.replace(/\D/g, "").length >= 6, "Enter a valid phone number"),
  jobTitle: z.string().trim().min(2, "Please enter the role you are applying for").max(100),
  coverLetter: z.string().trim().max(3000, "Cover letter is too long").optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must agree to the Privacy Policy"),
  locale: z.preprocess((value) => value || undefined, z.enum(["en", "ar"]).default("en")),
  // Honeypot
  website: z.string().max(0, "Invalid submission").optional().or(z.literal("")),
});

export type CareersInput = z.infer<typeof careersSchema>;

export const ALLOWED_CV_TYPES = ["application/pdf", "application/msword"];
export const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];
export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB, matching the original site.

export function validateCvFile(file: File): string | null {
  if (file.size > MAX_CV_BYTES) return "CV must be 5MB or smaller";
  const name = file.name.toLowerCase();
  const extOk = ALLOWED_CV_EXT.some((ext) => name.endsWith(ext));
  const typeOk = ALLOWED_CV_TYPES.some((t) => file.type === t) || name.endsWith(".docx");
  if (!extOk || !typeOk) return "CV must be a PDF, DOC or DOCX file";
  return null;
}

export type CareersFieldErrors = Partial<Record<keyof CareersInput, string>>;
export type CareersFormState =
  | { status: "idle" }
  | { status: "error"; errors: CareersFieldErrors; cvError?: string; message?: string }
  | { status: "success"; message: string };
