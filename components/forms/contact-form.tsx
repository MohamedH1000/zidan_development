"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { undecidedAreaSlug, type ContactFormState } from "@/lib/validations/contact";
import { areas } from "@/config/site";
import { inputClass, Field } from "@/components/ui/field";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const errors = state.status === "error" ? state.errors : {};
  const success = state.status === "success";
  const t = useTranslations("forms.contact");
  const locale = useLocale() as "en" | "ar";

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
      <input type="hidden" name="locale" value={locale} />
      <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 gap-4 sm:grid-cols-2"}>
        <Field label={t("fullName")} htmlFor="fullName" required error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required placeholder={t("fullNamePlaceholder")} className={inputClass} />
        </Field>
        <Field label={t("phone")} htmlFor="phone" required error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder={t("phonePlaceholder")} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("email")} htmlFor="email" required error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder={t("emailPlaceholder")} className={inputClass} />
        </Field>
        <Field label={t("area")} htmlFor="area" error={errors.area}>
          <select id="area" name="area" defaultValue={undecidedAreaSlug} className={inputClass}>
            <option value={undecidedAreaSlug}>{t("areaPlaceholder")}</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {locale === "ar" ? area.ar : area.en}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("message")} htmlFor="message" error={errors.message} hint={t("messageHint")}>
        <textarea id="message" name="message" rows={4} placeholder={t("messagePlaceholder")} className={`${inputClass} resize-none`} />
      </Field>

      <div className="flex flex-col gap-3 pt-1">
        <button type="submit" disabled={isPending} className={buttonVariants({ variant: "gold", size: "lg", className: "w-full" })}>
          {isPending ? (
            <>
              <Spinner /> {t("sending")}
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
        <p className="text-center text-xs text-ink-500">{t("socialHousingNote")}</p>
      </div>
    </form>
  );
}
