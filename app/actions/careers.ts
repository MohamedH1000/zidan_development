"use server";

import {
  ALLOWED_CV_TYPES,
  careersSchema,
  validateCvFile,
  type CareersFieldErrors,
  type CareersFormState,
} from "@/lib/validations/careers";
import { createNotificationService } from "@/lib/notifications";
import { siteConfig } from "@/config/site";

/**
 * Server action for the careers application form. Field values are validated
 * with Zod and the uploaded CV is checked for type/size before it is ever
 * forwarded — no untrusted bytes leave the process.
 */
export async function submitCareers(
  _prevState: CareersFormState,
  formData: FormData,
): Promise<CareersFormState> {
  const raw = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    jobTitle: formData.get("jobTitle"),
    coverLetter: formData.get("coverLetter"),
    consent: formData.get("consent") === "on",
    website: formData.get("website"), // honeypot
  };

  const parsed = careersSchema.safeParse(raw);
  const errors: CareersFieldErrors = {};
  let cvError: string | undefined;

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof CareersFieldErrors;
      if (!errors[key]) errors[key] = issue.message;
    }
  }

  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    cvError = "Please attach your CV (PDF, DOC or DOCX, max 5MB).";
  } else if (cv && typeof cv === "object" && "name" in cv) {
    cvError = validateCvFile(cv as File) ?? undefined;
  }

  if (!parsed.success || cvError) {
    return {
      status: "error",
      errors,
      cvError,
      message: "Please review the form and try again.",
    };
  }

  const data = parsed.data;
  const notifier = createNotificationService();
  const result = await notifier.send({
    to: { email: siteConfig.contact.careersEmail, name: "Zidan Careers" },
    replyTo: { email: data.email, name: data.fullName },
    subject: `New application — ${data.jobTitle}`,
    text: [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Role: ${data.jobTitle}`,
      `CV: ${(cv as File).name} (${ALLOWED_CV_TYPES.join("/")} · ${((cv as File).size / 1024).toFixed(0)}KB)`,
      `Cover letter: ${data.coverLetter?.trim() || "—"}`,
    ].join("\n"),
    meta: { source: "careers-form", role: data.jobTitle },
  });

  if (!result.success) {
    return {
      status: "error",
      errors: {},
      message: "We couldn't submit your application. Please try again or email us directly.",
    };
  }

  return {
    status: "success",
    message: "Thank you for applying. If your profile matches an open role, we'll be in touch.",
  };
}
