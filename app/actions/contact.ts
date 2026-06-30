"use server";

import {
  contactSchema,
  undecidedAreaSlug,
  type ContactFieldErrors,
  type ContactFormState,
} from "@/lib/validations/contact";
import { createNotificationService } from "@/lib/notifications";
import { siteConfig, getAreaName } from "@/config/site";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function areaLabel(slug: string, locale: "en" | "ar"): string {
  if (slug === undecidedAreaSlug) return locale === "ar" ? "لم يحدد بعد" : "Not sure yet";
  return getAreaName(slug, locale);
}

function buildContactEmailHtml({
  fullName,
  phone,
  email,
  areaEn,
  areaAr,
  message,
  locale,
}: {
  fullName: string;
  phone: string;
  email: string;
  areaEn: string;
  areaAr: string;
  message: string;
  locale: "en" | "ar";
}) {
  const submittedLanguage = locale === "ar" ? "Arabic / العربية" : "English / الإنجليزية";
  const safe = {
    fullName: escapeHtml(fullName),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    areaEn: escapeHtml(areaEn),
    areaAr: escapeHtml(areaAr),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
    submittedLanguage: escapeHtml(submittedLanguage),
  };

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f3ec;padding:32px 16px;font-family:Arial,'Helvetica Neue',sans-serif;color:#111111">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#fbf8f2;border:1px solid #e0d8c8;border-radius:18px;overflow:hidden">
      <tr>
        <td style="background:#0a0a0a;padding:28px 30px;color:#f7f3ec">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#d9bc7a;font-weight:700">Zidan Development</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;font-weight:700">New contact request</h1>
          <p dir="rtl" style="margin:8px 0 0;font-size:18px;line-height:1.5;color:#f7f3ec">طلب تواصل جديد</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 30px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${emailRow("Name", "الاسم", safe.fullName)}
            ${emailRow("Phone", "الهاتف", safe.phone)}
            ${emailRow("Email", "البريد الإلكتروني", safe.email)}
            ${emailRow("Area", "المنطقة", `${safe.areaEn}<br /><span dir="rtl">${safe.areaAr}</span>`)}
            ${emailRow("Submitted language", "لغة النموذج", safe.submittedLanguage)}
          </table>
          <div style="margin-top:22px;padding:18px 20px;border-radius:14px;background:#ffffff;border:1px solid #efe9dd">
            <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9c7a38">Message / الرسالة</div>
            <p style="margin:10px 0 0;font-size:15px;line-height:1.8;color:#262626">${safe.message}</p>
          </div>
          <div style="margin-top:22px;padding:16px 18px;border-radius:14px;background:#efe9dd;color:#3a3a3a;font-size:13px;line-height:1.7">
            Reply directly to this email to contact the client.<br />
            <span dir="rtl">يمكنك الرد مباشرة على هذه الرسالة للتواصل مع العميل</span>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function emailRow(labelEn: string, labelAr: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #efe9dd">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#9c7a38">${labelEn}</div>
        <div dir="rtl" style="margin-top:2px;font-size:12px;color:#9c7a38">${labelAr}</div>
        <div style="margin-top:6px;font-size:16px;line-height:1.5;color:#111111;font-weight:700">${value}</div>
      </td>
    </tr>`;
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const formValue = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };
  const submittedLocale = formValue("locale") === "ar" ? "ar" : "en";

  const raw = {
    fullName: formValue("fullName"),
    phone: formValue("phone"),
    email: formValue("email"),
    area: formValue("area") || undecidedAreaSlug,
    message: formValue("message"),
    locale: submittedLocale,
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
  const areaEn = areaLabel(data.area, "en");
  const areaAr = areaLabel(data.area, "ar");
  const message = data.message?.trim() || (data.locale === "ar" ? "لا توجد رسالة إضافية" : "No message provided");
  const recipientEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;

  const result = await notifier.send({
    to: { email: recipientEmail, name: siteConfig.name },
    replyTo: { email: data.email, name: data.fullName },
    subject: `New Zidan contact request - ${areaEn}`,
    text: [
      "New contact request / طلب تواصل جديد",
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Area: ${areaEn} / ${areaAr}`,
      `Submitted language: ${data.locale}`,
      `Message: ${message}`,
    ].join("\n"),
    html: buildContactEmailHtml({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      areaEn,
      areaAr,
      message,
      locale: data.locale,
    }),
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
    message: "Thank you - our team will contact you shortly.",
  };
}
