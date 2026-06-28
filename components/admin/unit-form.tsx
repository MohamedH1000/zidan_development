"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Trash2, Loader2, Save } from "lucide-react";
import type { Unit } from "@prisma/client";
import { saveUnit, type UnitFormState } from "@/app/actions/admin-units";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";

const AVAIL_OPTIONS: { value: string; label: string }[] = [
  { value: "Available", label: "Available" },
  { value: "Reserved", label: "Reserved" },
  { value: "Sold", label: "Sold" },
];

export function UnitForm({
  initial,
  projects,
}: {
  initial?: Unit;
  projects: { id: string; nameEn: string }[];
}) {
  const [state, formAction, pending] = useActionState<UnitFormState, FormData>(saveUnit, undefined);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminSection title="Unit" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Project *" className="sm:col-span-2">
          <select name="projectId" required defaultValue={initial?.projectId ?? ""} className={adminInput}>
            <option value="" disabled>Select a project…</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.nameEn}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Unit code / slug *">
          <input name="slug" required defaultValue={initial?.slug ?? ""} placeholder="D292-A1" className={adminInput} />
        </AdminField>
        <AdminField label="Availability">
          <select name="availability" defaultValue={initial?.availability ?? "Available"} className={adminInput}>
            {AVAIL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Unit type (EN) *">
          <input name="unitTypeEn" required defaultValue={initial?.unitTypeEn ?? ""} placeholder="Apartment" className={adminInput} />
        </AdminField>
        <AdminField label="Unit type (AR) *">
          <input name="unitTypeAr" required defaultValue={initial?.unitTypeAr ?? ""} dir="rtl" className={adminInput} />
        </AdminField>
      </div>

      <AdminSection title="Specifications" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <AdminField label="Unit area (m²)"><input name="area" type="number" step="0.1" defaultValue={initial?.area ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Bedrooms"><input name="bedrooms" type="number" defaultValue={initial?.bedrooms ?? 0} className={adminInput} /></AdminField>
        <AdminField label="Bathrooms"><input name="bathrooms" type="number" defaultValue={initial?.bathrooms ?? 0} className={adminInput} /></AdminField>
        <AdminField label="Living rooms"><input name="livingRoom" type="number" defaultValue={initial?.livingRoom ?? 0} className={adminInput} /></AdminField>
        <AdminField label="Garden area (m²)"><input name="gardenArea" type="number" step="0.1" defaultValue={initial?.gardenArea ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Sort order"><input name="sortOrder" type="number" defaultValue={initial?.sortOrder ?? 0} className={adminInput} /></AdminField>
      </div>

      <AdminSection title="Unit plan" />
      <AdminField label="Plan image">
        {initial?.planImageUrl ? (
          <div className="mb-2 flex items-center gap-3">
            <div className="relative h-24 w-32 overflow-hidden rounded border border-white/10">
              <Image src={initial.planImageUrl} alt="" fill sizes="128px" className="object-cover" />
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-ink-300">
              <input type="checkbox" name="removePlan" className="h-4 w-4 rounded border-white/20 text-gold-500" /> Remove current plan
            </label>
          </div>
        ) : null}
        <input type="file" name="planImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/10 bg-ink-950/80 py-4 backdrop-blur">
        <a href="/admin/units" className={buttonVariants({ variant: "ghost", size: "md", className: "text-ink-300" })}>Cancel</a>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md" })}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial ? "Save changes" : "Create unit"}
        </button>
      </div>
    </form>
  );
}
