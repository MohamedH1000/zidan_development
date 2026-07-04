"use client";

import { useActionState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Save } from "lucide-react";
import type { Unit } from "@prisma/client";
import { saveUnit, type UnitFormState } from "@/app/actions/admin-units";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

const AVAIL_OPTIONS = ["Available", "Reserved", "Sold"];

export function UnitForm({
  initial,
  projects,
}: {
  initial?: Unit;
  projects: { id: string; nameEn: string }[];
}) {
  const t = useTranslations("admin");
  const [state, formAction, pending] = useActionState<UnitFormState, FormData>(saveUnit, undefined);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminSection title={t("forms.sections.unit")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.projectRequired")} className="sm:col-span-2">
          <select name="projectId" required defaultValue={initial?.projectId ?? ""} className={adminInput}>
            <option value="" disabled>Select a project…</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.nameEn}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label={t("forms.fields.unitCodeRequired")}>
          <input name="slug" required defaultValue={initial?.slug ?? ""} placeholder="D292-A1" className={adminInput} />
        </AdminField>
        <AdminField label={t("tables.availability")}>
          <select name="availability" defaultValue={initial?.availability ?? "Available"} className={adminInput}>
            {AVAIL_OPTIONS.map((o) => (
              <option key={o} value={o}>{t(`statuses.availability.${o}`)}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label={t("forms.fields.unitTypeEnRequired")}>
          <input name="unitTypeEn" required defaultValue={initial?.unitTypeEn ?? ""} placeholder="Apartment" className={adminInput} />
        </AdminField>
        <AdminField label={t("forms.fields.unitTypeArRequired")}>
          <input name="unitTypeAr" required defaultValue={initial?.unitTypeAr ?? ""} dir="rtl" className={adminInput} />
        </AdminField>
      </div>

      <AdminSection title={t("forms.sections.specifications")} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <AdminField label={t("forms.fields.unitArea")}><input name="area" type="number" step="0.1" defaultValue={initial?.area ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.bedrooms")}><input name="bedrooms" type="number" defaultValue={initial?.bedrooms ?? 0} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.bathrooms")}><input name="bathrooms" type="number" defaultValue={initial?.bathrooms ?? 0} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.livingRooms")}><input name="livingRoom" type="number" defaultValue={initial?.livingRoom ?? 0} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.gardenArea")}><input name="gardenArea" type="number" step="0.1" defaultValue={initial?.gardenArea ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.sortOrder")}><input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={adminInput} /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.unitPlan")} />
      <AdminField label={t("forms.fields.planImage")}>
        {initial?.planImageUrl ? (
          <div className="mb-2 flex items-center gap-3">
            <div className="relative h-24 w-32 overflow-hidden rounded border border-white/10">
              <Image src={initial.planImageUrl} alt="" fill sizes="128px" className="object-cover" />
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-ink-300">
              <input type="checkbox" name="removePlan" className="h-4 w-4 rounded border-white/20 text-gold-500" /> {t("forms.fields.removeCurrentPlan")}
            </label>
          </div>
        ) : null}
        <input type="file" name="planImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <div className="sticky bottom-0 flex flex-col-reverse items-stretch gap-3 border-t border-white/10 bg-ink-950/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-end">
        <Link href="/admin/units" className={buttonVariants({ variant: "ghost", size: "md", className: "justify-center text-ink-300" })}>{t("actions.cancel")}</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md", className: "justify-center" })}>
          {pending ? <Spinner /> : <Save className="h-4 w-4" />}
          {initial ? t("actions.saveChanges") : t("actions.createUnit")}
        </button>
      </div>
    </form>
  );
}
