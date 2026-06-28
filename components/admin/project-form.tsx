"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Trash2, Loader2, Save } from "lucide-react";
import type { Project } from "@prisma/client";
import { saveProject, type ProjectFormState } from "@/app/actions/admin-projects";
import { AdminField, AdminSection, adminInput, adminLabel } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "Available", label: "Available" },
  { value: "UnderConstruction", label: "Under Construction" },
  { value: "Delivered", label: "Delivered" },
  { value: "ComingSoon", label: "Coming Soon" },
];

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={adminInput} />;
}
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${adminInput} min-h-24 resize-y`} />;
}

export function ProjectForm({ initial }: { initial?: Project }) {
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

      <AdminSection title="Core" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Slug *">
          <TextInput name="slug" required defaultValue={initial?.slug ?? ""} placeholder="new-narges" />
        </AdminField>
        <AdminField label="Status">
          <select name="status" defaultValue={initial?.status ?? "Available"} className={adminInput}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Featured">
          <label className="inline-flex items-center gap-2 pt-1">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 rounded border-white/20 text-gold-500" />
            Show on homepage
          </label>
        </AdminField>
        <AdminField label="Sort order">
          <TextInput name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} />
        </AdminField>
        <AdminField label="Accent color">
          <TextInput name="accent" defaultValue={initial?.accent ?? "#c8a45c"} placeholder="#c8a45c" />
        </AdminField>
      </div>

      <AdminSection title="Name & location (EN / AR)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Name (EN) *"><TextInput name="nameEn" required defaultValue={initial?.nameEn ?? ""} /></AdminField>
        <AdminField label="Name (AR) *"><TextInput name="nameAr" required defaultValue={initial?.nameAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="Short name (EN)"><TextInput name="shortNameEn" defaultValue={initial?.shortNameEn ?? ""} /></AdminField>
        <AdminField label="Short name (AR)"><TextInput name="shortNameAr" defaultValue={initial?.shortNameAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="Tagline (EN)"><TextInput name="taglineEn" defaultValue={initial?.taglineEn ?? ""} /></AdminField>
        <AdminField label="Tagline (AR)"><TextInput name="taglineAr" defaultValue={initial?.taglineAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="District (EN)"><TextInput name="districtEn" defaultValue={initial?.districtEn ?? ""} /></AdminField>
        <AdminField label="District (AR)"><TextInput name="districtAr" defaultValue={initial?.districtAr ?? ""} dir="rtl" /></AdminField>
      </div>

      <AdminSection title="Description (EN / AR) — one paragraph per line" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Summary (EN)"><TextArea name="summaryEn" defaultValue={initial?.summaryEn ?? ""} /></AdminField>
        <AdminField label="Summary (AR)"><TextArea name="summaryAr" defaultValue={initial?.summaryAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="Description (EN)"><TextArea name="descriptionEn" defaultValue={(initial?.descriptionEn ?? []).join("\n")} rows={5} /></AdminField>
        <AdminField label="Description (AR)"><TextArea name="descriptionAr" defaultValue={(initial?.descriptionAr ?? []).join("\n")} rows={5} dir="rtl" /></AdminField>
      </div>

      <AdminSection title="Card specs (EN / AR)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminField label="Down payment (EN)"><TextInput name="downPaymentEn" defaultValue={initial?.downPaymentEn ?? ""} /></AdminField>
        <AdminField label="Installment (EN)"><TextInput name="installmentEn" defaultValue={initial?.installmentEn ?? ""} /></AdminField>
        <AdminField label="Delivery (EN)"><TextInput name="deliveryEn" defaultValue={initial?.deliveryEn ?? ""} /></AdminField>
        <AdminField label="Down payment (AR)"><TextInput name="downPaymentAr" defaultValue={initial?.downPaymentAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="Installment (AR)"><TextInput name="installmentAr" defaultValue={initial?.installmentAr ?? ""} dir="rtl" /></AdminField>
        <AdminField label="Delivery (AR)"><TextInput name="deliveryAr" defaultValue={initial?.deliveryAr ?? ""} dir="rtl" /></AdminField>
      </div>

      <AdminSection title="Project metadata (from the Zidan fields)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminField label="Project Availability"><TextInput name="projectAvailability" defaultValue={initial?.projectAvailability ?? ""} placeholder="Available / Sold Out" /></AdminField>
        <AdminField label="Property Status"><TextInput name="propertyStatus" defaultValue={initial?.propertyStatus ?? ""} placeholder="Under Construction / Ready" /></AdminField>
        <AdminField label="Delivery Date"><TextInput name="deliveryDate" defaultValue={initial?.deliveryDate ?? ""} placeholder="Q4 2027" /></AdminField>
      </div>

      <AdminSection title="Features (one per line)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Features of Location (EN)"><TextArea name="featuresLocationEn" defaultValue={(initial?.featuresLocationEn ?? []).join("\n")} /></AdminField>
        <AdminField label="Features of Location (AR)"><TextArea name="featuresLocationAr" defaultValue={(initial?.featuresLocationAr ?? []).join("\n")} dir="rtl" /></AdminField>
        <AdminField label="Features of Project (EN)"><TextArea name="featuresProjectEn" defaultValue={(initial?.featuresProjectEn ?? []).join("\n")} /></AdminField>
        <AdminField label="Features of Project (AR)"><TextArea name="featuresProjectAr" defaultValue={(initial?.featuresProjectAr ?? []).join("\n")} dir="rtl" /></AdminField>
      </div>

      <AdminSection title="Location & map" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Google Map Link"><TextInput name="googleMapLink" defaultValue={initial?.googleMapLink ?? ""} /></AdminField>
        <AdminField label="Map embed (iframe src)" hint="Paste only the src URL from the map embed code.">
          <TextInput name="mapEmbed" defaultValue={initial?.mapEmbed ?? ""} />
        </AdminField>
      </div>

      <AdminSection title="Images" />
      {keptImages.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {keptImages.map((url) => (
            <div key={url} className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image src={url} alt="" fill sizes="200px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 rounded bg-black/60 p-1 text-red-400 hover:bg-black/80"
                aria-label="Remove image"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <AdminField label="Add gallery images" hint="Select multiple — uploaded to Cloudinary.">
        <input type="file" name="images" multiple accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <AdminField label="3D Render">
        {initial?.render3dUrl ? (
          <div className="mb-2 flex items-center gap-3">
            <div className="relative h-16 w-24 overflow-hidden rounded border border-white/10">
              <Image src={initial.render3dUrl} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-ink-300">
              <input type="checkbox" name="removeRender" className="h-4 w-4 rounded border-white/20 text-gold-500" /> Remove current render
            </label>
          </div>
        ) : null}
        <input type="file" name="render3d" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/10 bg-ink-950/80 py-4 backdrop-blur">
        <a href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "md", className: "text-ink-300" })}>Cancel</a>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md" })}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial ? "Save changes" : "Create project"}
        </button>
      </div>
    </form>
  );
}
