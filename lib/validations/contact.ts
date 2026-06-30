import { z } from "zod";
import { areas } from "@/config/site";

const areaSlugs = areas.map((area) => area.slug) as [string, ...string[]];
export const undecidedAreaSlug = "not-sure";

function normalizePhoneDigits(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0));
}

/**
 * Server-side validation contract for the "Request a call back" form.
 * The same schema drives client-side validation, keeping a single source of
 * truth (DRY) and enforcing input safety at the trust boundary.
 */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(32, "Phone number is too long")
    .refine((value) => normalizePhoneDigits(value).replace(/\D/g, "").length >= 6, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  area: z.union([z.enum(areaSlugs), z.literal(undecidedAreaSlug)]),
  message: z.preprocess(
    (value) => (typeof value === "string" ? value : ""),
    z.string().trim().max(1000, "Message is too long"),
  ),
  locale: z.preprocess((value) => value || undefined, z.enum(["en", "ar"]).default("en")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; errors: ContactFieldErrors; message?: string }
  | { status: "success"; message: string };
