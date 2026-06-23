"use client";

import { useRef, useState, useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send, Upload } from "lucide-react";
import { submitCareers } from "@/app/actions/careers";
import type { CareersFormState } from "@/lib/validations/careers";
import { ALLOWED_CV_EXT } from "@/lib/validations/careers";
import { inputClass, Field, FieldError } from "@/components/ui/field";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const initialState: CareersFormState = { status: "idle" };

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export function CareersForm() {
  const [state, formAction, isPending] = useActionState(submitCareers, initialState);
  const errors = state.status === "error" ? state.errors : {};
  const cvError = state.status === "error" ? state.cvError : undefined;
  const success = state.status === "success";
  const t = useTranslations("forms.careers");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold-500/30 bg-white p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">{t("successTitle")}</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-600">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("fullName")} htmlFor="fullName" required error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" required placeholder={t("fullNamePlaceholder")} className={inputClass} />
        </Field>
        <Field label={t("email")} htmlFor="email" required error={errors.email}>
          <input id="email" name="email" type="email" required placeholder={t("emailPlaceholder")} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("phone")} htmlFor="phone" required error={errors.phone}>
          <input id="phone" name="phone" type="tel" required placeholder={t("phonePlaceholder")} className={inputClass} />
        </Field>
        <Field label={t("jobTitle")} htmlFor="jobTitle" required error={errors.jobTitle}>
          <input id="jobTitle" name="jobTitle" type="text" required placeholder={t("jobTitlePlaceholder")} className={inputClass} />
        </Field>
      </div>

      {/* CV upload */}
      <div>
        <label htmlFor="cv" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-600">
          {t("cv")} <span className="ms-0.5 text-gold-600">*</span>
        </label>
        <input
          ref={fileInputRef}
          id="cv"
          name="cv"
          type="file"
          accept={ALLOWED_CV_EXT.join(",")}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setFileName(file?.name ?? null);
            setFileSize(file?.size ?? null);
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-dashed px-4 py-3 text-sm transition-colors",
            cvError ? "border-red-400" : "border-ink-900/20 hover:border-gold-500",
          )}
        >
          <span className="flex items-center gap-2 text-ink-600">
            <Upload className="h-4 w-4 text-gold-600" />
            {fileName ? fileName : t("uploadCv")}
          </span>
          <span className="text-xs text-ink-500">
            {fileName && fileSize ? formatBytes(fileSize) : t("cvHint")}
          </span>
        </button>
        <FieldError>{cvError}</FieldError>
      </div>

      <Field label={t("coverLetter")} htmlFor="coverLetter" error={errors.coverLetter} hint={t("coverLetterHint")}>
        <textarea id="coverLetter" name="coverLetter" rows={4} placeholder={t("coverLetterPlaceholder")} className={`${inputClass} resize-none`} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input id="consent" name="consent" type="checkbox" className="mt-1 h-4 w-4 rounded border-ink-900/30 text-gold-600 focus:ring-gold-500" />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute start-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={isPending} className={buttonVariants({ variant: "gold", size: "lg", className: "w-full" })}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t("submitting")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {t("submit")}
          </>
        )}
      </button>

      {state.status === "error" && state.message ? (
        <p className="text-center text-xs font-medium text-red-600">{state.message}</p>
      ) : null}
    </form>
  );
}
