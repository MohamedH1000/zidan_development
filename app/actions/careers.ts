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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailRow(labelEn: string, labelAr: string, value: string, dir: "ltr" | "rtl" = "ltr") {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #efe9dd">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#9c7a38">${labelEn}</div>
        <div dir="rtl" style="margin-top:2px;font-size:12px;color:#9c7a38">${labelAr}</div>
        <div dir="${dir}" style="margin-top:6px;font-size:16px;line-height:1.6;color:#111111;font-weight:700">${value}</div>
      </td>
    </tr>`;
}

function buildCareersEmailHtml({
  fullName,
  email,
  phone,
  jobTitle,
  coverLetter,
  cvName,
  cvSize,
  locale,
}: {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  coverLetter: string;
  cvName: string;
  cvSize: string;
  locale: "en" | "ar";
}) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const submittedLanguage = locale === "ar" ? "Arabic / العربية" : "English / الإنجليزية";
  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    jobTitle: escapeHtml(jobTitle),
    coverLetter: escapeHtml(coverLetter).replace(/\n/g, "<br />"),
    cvName: escapeHtml(cvName),
    cvSize: escapeHtml(cvSize),
    submittedLanguage: escapeHtml(submittedLanguage),
  };

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f3ec;padding:32px 16px;font-family:Arial,'Helvetica Neue',sans-serif;color:#111111">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;margin:0 auto;background:#fbf8f2;border:1px solid #e0d8c8;border-radius:18px;overflow:hidden">
      <tr>
        <td style="background:#0a0a0a;padding:30px;color:#f7f3ec">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#d9bc7a;font-weight:700">Zidan Development Careers</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;font-weight:700">New job application</h1>
          <p dir="rtl" style="margin:8px 0 0;font-size:18px;line-height:1.5;color:#f7f3ec">طلب توظيف جديد</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 30px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${emailRow("Applicant", "المتقدم", safe.fullName, dir)}
            ${emailRow("Role", "الوظيفة", safe.jobTitle, dir)}
            ${emailRow("Email", "البريد الإلكتروني", safe.email)}
            ${emailRow("Phone", "الهاتف", safe.phone)}
            ${emailRow("Submitted language", "لغة النموذج", safe.submittedLanguage)}
            ${emailRow("CV attachment", "ملف السيرة الذاتية", `${safe.cvName}<br /><span style="font-weight:400;color:#525252">${safe.cvSize}</span>`)}
          </table>

          <div style="margin-top:22px;padding:18px 20px;border-radius:14px;background:#ffffff;border:1px solid #efe9dd">
            <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9c7a38">Cover letter / خطاب التقديم</div>
            <p dir="${dir}" style="margin:10px 0 0;font-size:15px;line-height:1.85;color:#262626">${safe.coverLetter}</p>
          </div>

          <div style="margin-top:22px;padding:16px 18px;border-radius:14px;background:#efe9dd;color:#3a3a3a;font-size:13px;line-height:1.7">
            The CV is attached to this email after server-side file validation.<br />
            <span dir="rtl">السيرة الذاتية مرفقة بهذه الرسالة بعد التحقق من الملف على الخادم</span>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64");
}

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
    locale: formData.get("locale"),
    website: formData.get("website"),
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
  const cvFile = cv as File;
  const cvSize = `${(cvFile.size / 1024).toFixed(0)}KB`;
  const coverLetter = data.coverLetter?.trim() || (data.locale === "ar" ? "لا يوجد خطاب تقديم" : "No cover letter provided");
  const notifier = createNotificationService();
  const recipientEmail = process.env.CAREERS_TO_EMAIL || process.env.CONTACT_TO_EMAIL || siteConfig.contact.careersEmail;

  const result = await notifier.send({
    to: { email: recipientEmail, name: "Zidan Careers" },
    replyTo: { email: data.email, name: data.fullName },
    subject: `New Zidan job application - ${data.jobTitle}`,
    text: [
      "New job application / طلب توظيف جديد",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Role: ${data.jobTitle}`,
      `Submitted language: ${data.locale}`,
      `CV: ${cvFile.name} (${ALLOWED_CV_TYPES.join("/")} - ${cvSize})`,
      `Cover letter: ${coverLetter}`,
    ].join("\n"),
    html: buildCareersEmailHtml({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      jobTitle: data.jobTitle,
      coverLetter,
      cvName: cvFile.name,
      cvSize,
      locale: data.locale,
    }),
    attachments: [
      {
        filename: cvFile.name,
        content: await fileToBase64(cvFile),
      },
    ],
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
