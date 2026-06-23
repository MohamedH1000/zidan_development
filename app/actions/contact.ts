"use server";

import { contactSchema, type ContactFieldErrors, type ContactFormState } from "@/lib/validations/contact";
import { createNotificationService } from "@/lib/notifications";
import { siteConfig, getAreaName } from "@/config/site";

/**
 * Server action for the "Request a call back" form.
 * Validates input with Zod, rejects honeypot submissions, and forwards the
 * enquiry through the abstracted notification service.
 */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    area: formData.get("area"),
    message: formData.get("message"),
    company: formData.get("company"), // honeypot
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFieldErrors;
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      errors,
      message: "Please correct the highlighted fields and try again.",
    };
  }

  const data = parsed.data;
  const notifier = createNotificationService();
  const result = await notifier.send({
    to: { email: siteConfig.contact.email, name: siteConfig.name },
    replyTo: { email: data.email, name: data.fullName },
    subject: `New call-back request — ${getAreaName(data.area, "en")}`,
    text: [
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Area of interest: ${getAreaName(data.area, "en")} (${data.area})`,
      `Message: ${data.message?.trim() || "—"}`,
    ].join("\n"),
    meta: { source: "contact-form", area: data.area },
  });

  if (!result.success) {
    return {
      status: "error",
      errors: {},
      message: "We couldn't send your request. Please call us or try again shortly.",
    };
  }

  return {
    status: "success",
    message: "Thank you — our team will contact you shortly.",
  };
}
