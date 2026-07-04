"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Trash2, Save } from "lucide-react";
import type { Project } from "@prisma/client";
import { saveProject, type ProjectFormState } from "@/app/actions/admin-projects";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

const STATUS_OPTIONS = ["Available", "UnderConstruction", "Delivered", "ComingSoon"];

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={adminInput} />;
}
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${adminInput} min-h-24 resize-y`} />;
}

export function ProjectForm({ initial }: { initial?: Project }) {
  const t = useTranslations("admin");
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(saveProject, undefined);
  const [keptImages, setKeptImages] = useState<string[]>(initial?.images ?? []);

  function removeImage(url: string) {
    setKeptImages((prev) => prev.filter((u) => u !== url));
  }

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />
      <input type="hidden" name="keepImages" value={JSON.stringify(keptImages)} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminSection title={t("forms.sections.core")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.slugRequired")}>
          <TextInput name="slug" required defaultValue={initial?.slug ?? ""} placeholder="new-narges" />
        </AdminField>
        <AdminField label={t("tables.status")}>
          <select name="status" defaultValue={initial?.status ?? "Available"} className={adminInput}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{t(`statuses.project.${s}`)}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label={t("tables.featured")}>
          <label className="inline-flex items-center gap-2 pt-1">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 rounded border-white/20 text-gold-500" />
            {t("forms.fields.showOnHomepage")}
          </label>
        </AdminField>
        <AdminField label={t("forms.fields.sortOrder")}>
          <TextInput name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} />
        </AdminField>
        <AdminField label={t("forms.fields.accentColor")}>
          <TextInput name="accent" defaultValue={initial?.accent ?? "#c8a45c"} placeholder="#c8a45c" />
        </AdminField>
      </div>

      <AdminSection title={t("forms.sections.nameLocation")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.nameEnRequired")}><TextInput name="nameEn" required defaultValue={initial?.nameEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.nameArRequired")}><TextInput name="nameAr" required defaultValue={initial?.nameAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.shortNameEn")}><TextInput name="shortNameEn" defaultValue={initial?.shortNameEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.shortNameAr")}><TextInput name="shortNameAr" defaultValue={initial?.shortNameAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.taglineEn")}><TextInput name="taglineEn" defaultValue={initial?.taglineEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.taglineAr")}><TextInput name="taglineAr" defaultValue={initial?.taglineAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.districtEn")}><TextInput name="districtEn" defaultValue={initial?.districtEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.districtAr")}><TextInput name="districtAr" defaultValue={initial?.districtAr ?? ""} dir="rtl" /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.description")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.summaryEn")}><TextArea name="summaryEn" defaultValue={initial?.summaryEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.summaryAr")}><TextArea name="summaryAr" defaultValue={initial?.summaryAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.descriptionEn")}><TextArea name="descriptionEn" defaultValue={(initial?.descriptionEn ?? []).join("\n")} rows={5} /></AdminField>
        <AdminField label={t("forms.fields.descriptionAr")}><TextArea name="descriptionAr" defaultValue={(initial?.descriptionAr ?? []).join("\n")} rows={5} dir="rtl" /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.cardSpecs")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminField label={t("forms.fields.downPaymentEn")}><TextInput name="downPaymentEn" defaultValue={initial?.downPaymentEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.installmentEn")}><TextInput name="installmentEn" defaultValue={initial?.installmentEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.deliveryEn")}><TextInput name="deliveryEn" defaultValue={initial?.deliveryEn ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.downPaymentAr")}><TextInput name="downPaymentAr" defaultValue={initial?.downPaymentAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.installmentAr")}><TextInput name="installmentAr" defaultValue={initial?.installmentAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.deliveryAr")}><TextInput name="deliveryAr" defaultValue={initial?.deliveryAr ?? ""} dir="rtl" /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.projectMetadata")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminField label={t("forms.fields.projectAvailability")}><TextInput name="projectAvailability" defaultValue={initial?.projectAvailability ?? ""} placeholder="Available / Sold Out" /></AdminField>
        <AdminField label={t("forms.fields.propertyStatus")}><TextInput name="propertyStatus" defaultValue={initial?.propertyStatus ?? ""} placeholder="Under Construction / Ready" /></AdminField>
        <AdminField label={t("forms.fields.deliveryDate")}><TextInput name="deliveryDate" defaultValue={initial?.deliveryDate ?? ""} placeholder="Q4 2027" /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.features")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.featuresLocationEn")}><TextArea name="featuresLocationEn" defaultValue={(initial?.featuresLocationEn ?? []).join("\n")} /></AdminField>
        <AdminField label={t("forms.fields.featuresLocationAr")}><TextArea name="featuresLocationAr" defaultValue={(initial?.featuresLocationAr ?? []).join("\n")} dir="rtl" /></AdminField>
        <AdminField label={t("forms.fields.featuresProjectEn")}><TextArea name="featuresProjectEn" defaultValue={(initial?.featuresProjectEn ?? []).join("\n")} /></AdminField>
        <AdminField label={t("forms.fields.featuresProjectAr")}><TextArea name="featuresProjectAr" defaultValue={(initial?.featuresProjectAr ?? []).join("\n")} dir="rtl" /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.locationMap")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.googleMapLink")}><TextInput name="googleMapLink" defaultValue={initial?.googleMapLink ?? ""} /></AdminField>
        <AdminField label={t("forms.fields.mapEmbed")} hint={t("forms.hints.mapEmbed")}>
          <TextInput name="mapEmbed" defaultValue={initial?.mapEmbed ?? ""} />
        </AdminField>
      </div>

      <AdminSection title={t("forms.sections.images")} />
      {keptImages.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {keptImages.map((url) => (
            <div key={url} className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image src={url} alt="" fill sizes="200px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 rounded bg-black/60 p-1 text-red-400 hover:bg-black/80"
                aria-label={t("forms.fields.removeImage")}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <AdminField label={t("forms.fields.addGalleryImages")} hint={t("forms.hints.cloudinaryMultiple")}>
        <input type="file" name="images" multiple accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <AdminField label={t("forms.fields.render3d")}>
        {initial?.render3dUrl ? (
          <div className="mb-2 flex items-center gap-3">
            <div className="relative h-16 w-24 overflow-hidden rounded border border-white/10">
              <Image src={initial.render3dUrl} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-ink-300">
              <input type="checkbox" name="removeRender" className="h-4 w-4 rounded border-white/20 text-gold-500" /> {t("forms.fields.removeCurrentRender")}
            </label>
          </div>
        ) : null}
        <input type="file" name="render3d" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <div className="sticky bottom-0 flex flex-col-reverse items-stretch gap-3 border-t border-white/10 bg-ink-950/90 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-end">
        <Link href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "md", className: "justify-center text-ink-300" })}>{t("actions.cancel")}</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md", className: "justify-center" })}>
          {pending ? <Spinner /> : <Save className="h-4 w-4" />}
          {initial ? t("actions.saveChanges") : t("actions.createProject")}
        </button>
      </div>
    </form>
  );
}
