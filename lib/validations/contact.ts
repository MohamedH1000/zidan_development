import { z } from "zod";
import { areas } from "@/config/site";

const areaSlugs = areas.map((area) => area.slug) as [string, ...string[]];

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
    .max(20, "Phone number is too long")
    .regex(/^[+\d][\d\s()-]{4,}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  area: z.enum(areaSlugs, { error: "Please select an area" }),
  message: z.string().trim().max(1000, "Message is too long").optional(),
  // Honeypot: must stay empty. Real users never see this field.
  company: z.string().max(0, "Invalid submission").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; errors: ContactFieldErrors; message?: string }
  | { status: "success"; message: string };
