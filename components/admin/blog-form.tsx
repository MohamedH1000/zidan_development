"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Trash2, Save } from "lucide-react";
import type { Blog } from "@prisma/client";
import { saveBlog, type BlogFormState } from "@/app/actions/admin-blogs";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "ARCHIVED", label: "Archived" },
];

function toDatetimeLocal(d: Date | string | null): string {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function BlogForm({
  initial,
  projects,
  authorId,
}: {
  initial?: Blog;
  projects: { id: string; nameEn: string }[];
  authorId: string;
}) {
  const [state, formAction, pending] = useActionState<BlogFormState, FormData>(saveBlog, undefined);
  const [gallery, setGallery] = useState<string[]>(initial?.galleryImages ?? []);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />
      <input type="hidden" name="authorId" value={initial?.authorId ?? authorId} />
      <input type="hidden" name="keepGallery" value={JSON.stringify(gallery)} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminSection title="Core" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Slug *">
          <input name="slug" required defaultValue={initial?.slug ?? ""} placeholder="new-cairo-2026" className={adminInput} />
        </AdminField>
        <AdminField label="Status">
          <select name="status" defaultValue={initial?.status ?? "PUBLISHED"} className={adminInput}>
            {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </AdminField>
        <AdminField label="Category" hint="e.g. Market Insights, Buying Guide">
          <input name="category" defaultValue={initial?.category ?? ""} className={adminInput} />
        </AdminField>
        <AdminField label="Tags" hint="Comma or new-line separated">
          <input name="tags" defaultValue={(initial?.tags ?? []).join(", ")} className={adminInput} />
        </AdminField>
        <AdminField label="Related project" hint="Optional spotlight">
          <select name="projectId" defaultValue={initial?.projectId ?? ""} className={adminInput}>
            <option value="">— None —</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.nameEn}</option>)}
          </select>
        </AdminField>
        <AdminField label="Reading time (min)">
          <input name="readingTime" type="number" defaultValue={initial?.readingTime ?? 5} className={adminInput} />
        </AdminField>
        <AdminField label="Publish / schedule date">
          <input name="publishedAt" type="datetime-local" defaultValue={toDatetimeLocal(initial?.publishedAt ?? null)} className={adminInput} />
        </AdminField>
        <AdminField label="Options">
          <div className="flex flex-col gap-2 pt-1 text-sm text-ink-300">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 rounded border-white/20 text-gold-500" /> Featured
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="allowComments" defaultChecked={initial?.allowComments ?? true} className="h-4 w-4 rounded border-white/20 text-gold-500" /> Allow comments
            </label>
          </div>
        </AdminField>
      </div>

      <AdminSection title="Title & excerpt (EN / AR)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Title (EN) *"><input name="titleEn" required defaultValue={initial?.titleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Title (AR) *"><input name="titleAr" required defaultValue={initial?.titleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label="Excerpt (EN)"><textarea name="excerptEn" defaultValue={initial?.excerptEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="Excerpt (AR)"><textarea name="excerptAr" defaultValue={initial?.excerptAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
      </div>

      <AdminSection title="Body — English (rich text)" />
      <RichTextEditor name="bodyEn" initialHtml={initial?.bodyEn ?? ""} />

      <AdminSection title="Body — Arabic (optional; falls back to English)" />
      <RichTextEditor name="bodyAr" initialHtml={initial?.bodyAr ?? ""} dir="rtl" />

      <AdminSection title="Cover image" />
      {initial?.coverImageUrl ? (
        <div className="mb-2 flex items-center gap-3">
          <div className="relative h-20 w-32 overflow-hidden rounded border border-white/10">
            <Image src={initial.coverImageUrl} alt="" fill sizes="128px" className="object-cover" />
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-ink-300">
            <input type="checkbox" name="removeCover" className="h-4 w-4 rounded border-white/20 text-gold-500" /> Remove cover
          </label>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Cover image"><input type="file" name="coverImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} /></AdminField>
        <AdminField label="Cover alt (EN)"><input name="coverImageAltEn" defaultValue={initial?.coverImageAltEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Cover alt (AR)"><input name="coverImageAltAr" defaultValue={initial?.coverImageAltAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
      </div>

      <AdminSection title="Gallery" />
      {gallery.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((url) => (
            <div key={url} className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image src={url} alt="" fill sizes="200px" className="object-cover" />
              <button type="button" onClick={() => setGallery((g) => g.filter((u) => u !== url))} className="absolute right-1 top-1 rounded bg-black/60 p-1 text-red-400 hover:bg-black/80">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <AdminField label="Add gallery images">
        <input type="file" name="galleryImages" multiple accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <AdminSection title="SEO (EN / AR)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Meta title (EN)"><input name="seoMetaTitleEn" defaultValue={initial?.seoMetaTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Meta title (AR)"><input name="seoMetaTitleAr" defaultValue={initial?.seoMetaTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label="Meta description (EN)"><textarea name="seoMetaDescriptionEn" defaultValue={initial?.seoMetaDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="Meta description (AR)"><textarea name="seoMetaDescriptionAr" defaultValue={initial?.seoMetaDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="Keywords (EN)" hint="Comma or new-line separated"><textarea name="seoKeywordsEn" defaultValue={(initial?.seoKeywordsEn ?? []).join(", ")} className={`${adminInput} min-h-16 resize-y`} /></AdminField>
        <AdminField label="Keywords (AR)" hint="Comma or new-line separated"><textarea name="seoKeywordsAr" defaultValue={(initial?.seoKeywordsAr ?? []).join(", ")} dir="rtl" className={`${adminInput} min-h-16 resize-y`} /></AdminField>
        <AdminField label="Canonical URL"><input name="canonicalUrl" defaultValue={initial?.canonicalUrl ?? ""} className={adminInput} /></AdminField>
      </div>

      <AdminSection title="Social — Open Graph & Twitter (EN / AR)" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="OG title (EN)"><input name="ogTitleEn" defaultValue={initial?.ogTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label="OG title (AR)"><input name="ogTitleAr" defaultValue={initial?.ogTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label="OG description (EN)"><textarea name="ogDescriptionEn" defaultValue={initial?.ogDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="OG description (AR)"><textarea name="ogDescriptionAr" defaultValue={initial?.ogDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="OG image (1200×630)"><input type="file" name="ogImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} /></AdminField>
        <AdminField label="Twitter card"><input name="twitterCard" defaultValue={initial?.twitterCard ?? "summary_large_image"} placeholder="summary_large_image" className={adminInput} /></AdminField>
        <AdminField label="Twitter title (EN)"><input name="twitterTitleEn" defaultValue={initial?.twitterTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label="Twitter title (AR)"><input name="twitterTitleAr" defaultValue={initial?.twitterTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label="Twitter description (EN)"><textarea name="twitterDescriptionEn" defaultValue={initial?.twitterDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="Twitter description (AR)"><textarea name="twitterDescriptionAr" defaultValue={initial?.twitterDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label="Twitter handle"><input name="twitterHandle" defaultValue={initial?.twitterHandle ?? ""} placeholder="@zidandev" className={adminInput} /></AdminField>
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/10 bg-ink-950/80 py-4 backdrop-blur">
        <Link href="/admin/blogs" className={buttonVariants({ variant: "ghost", size: "md", className: "text-ink-300" })}>Cancel</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md" })}>
          {pending ? <Spinner /> : <Save className="h-4 w-4" />}
          {initial ? "Save changes" : "Publish / save"}
        </button>
      </div>
    </form>
  );
}
