"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Trash2, Save } from "lucide-react";
import type { Blog } from "@prisma/client";
import { saveBlog, type BlogFormState } from "@/app/actions/admin-blogs";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

const STATUS_OPTIONS = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"];

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
  const t = useTranslations("admin");
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

      <AdminSection title={t("forms.sections.core")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.slugRequired")}>
          <input name="slug" required defaultValue={initial?.slug ?? ""} placeholder="new-cairo-2026" className={adminInput} />
        </AdminField>
        <AdminField label={t("tables.status")}>
          <select name="status" defaultValue={initial?.status ?? "PUBLISHED"} className={adminInput}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{t(`statuses.blog.${s}`)}</option>)}
          </select>
        </AdminField>
        <AdminField label={t("forms.fields.category")} hint={t("forms.hints.category")}>
          <input name="category" defaultValue={initial?.category ?? ""} className={adminInput} />
        </AdminField>
        <AdminField label={t("forms.fields.tags")} hint={t("forms.hints.separated")}>
          <input name="tags" defaultValue={(initial?.tags ?? []).join(", ")} className={adminInput} />
        </AdminField>
        <AdminField label={t("forms.fields.relatedProject")} hint={t("forms.hints.relatedProject")}>
          <select name="projectId" defaultValue={initial?.projectId ?? ""} className={adminInput}>
            <option value="">— None —</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.nameEn}</option>)}
          </select>
        </AdminField>
        <AdminField label={t("forms.fields.readingTime")}>
          <input name="readingTime" type="number" defaultValue={initial?.readingTime ?? 5} className={adminInput} />
        </AdminField>
        <AdminField label={t("forms.fields.publishDate")}>
          <input name="publishedAt" type="datetime-local" defaultValue={toDatetimeLocal(initial?.publishedAt ?? null)} className={adminInput} />
        </AdminField>
        <AdminField label={t("forms.fields.options")}>
          <div className="flex flex-col gap-2 pt-1 text-sm text-ink-300">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 rounded border-white/20 text-gold-500" /> {t("forms.fields.featured")}
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="allowComments" defaultChecked={initial?.allowComments ?? true} className="h-4 w-4 rounded border-white/20 text-gold-500" /> {t("forms.fields.allowComments")}
            </label>
          </div>
        </AdminField>
      </div>

      <AdminSection title={t("forms.sections.titleExcerpt")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.titleEnRequired")}><input name="titleEn" required defaultValue={initial?.titleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.titleArRequired")}><input name="titleAr" required defaultValue={initial?.titleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.excerptEn")}><textarea name="excerptEn" defaultValue={initial?.excerptEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.excerptAr")}><textarea name="excerptAr" defaultValue={initial?.excerptAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.bodyEnglish")} />
      <RichTextEditor name="bodyEn" initialHtml={initial?.bodyEn ?? ""} />

      <AdminSection title={t("forms.sections.bodyArabic")} />
      <RichTextEditor name="bodyAr" initialHtml={initial?.bodyAr ?? ""} dir="rtl" />

      <AdminSection title={t("forms.sections.coverImage")} />
      {initial?.coverImageUrl ? (
        <div className="mb-2 flex items-center gap-3">
          <div className="relative h-20 w-32 overflow-hidden rounded border border-white/10">
            <Image src={initial.coverImageUrl} alt="" fill sizes="128px" className="object-cover" />
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-ink-300">
            <input type="checkbox" name="removeCover" className="h-4 w-4 rounded border-white/20 text-gold-500" /> {t("forms.fields.removeCover")}
          </label>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.coverImage")}><input type="file" name="coverImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} /></AdminField>
        <AdminField label={t("forms.fields.coverAltEn")}><input name="coverImageAltEn" defaultValue={initial?.coverImageAltEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.coverAltAr")}><input name="coverImageAltAr" defaultValue={initial?.coverImageAltAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.gallery")} />
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
      <AdminField label={t("forms.fields.addGalleryImages")}>
        <input type="file" name="galleryImages" multiple accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} />
      </AdminField>

      <AdminSection title={t("forms.sections.seo")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.metaTitleEn")}><input name="seoMetaTitleEn" defaultValue={initial?.seoMetaTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.metaTitleAr")}><input name="seoMetaTitleAr" defaultValue={initial?.seoMetaTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.metaDescriptionEn")}><textarea name="seoMetaDescriptionEn" defaultValue={initial?.seoMetaDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.metaDescriptionAr")}><textarea name="seoMetaDescriptionAr" defaultValue={initial?.seoMetaDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.keywordsEn")} hint={t("forms.hints.separated")}><textarea name="seoKeywordsEn" defaultValue={(initial?.seoKeywordsEn ?? []).join(", ")} className={`${adminInput} min-h-16 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.keywordsAr")} hint={t("forms.hints.separated")}><textarea name="seoKeywordsAr" defaultValue={(initial?.seoKeywordsAr ?? []).join(", ")} dir="rtl" className={`${adminInput} min-h-16 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.canonicalUrl")}><input name="canonicalUrl" defaultValue={initial?.canonicalUrl ?? ""} className={adminInput} /></AdminField>
      </div>

      <AdminSection title={t("forms.sections.social")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label={t("forms.fields.ogTitleEn")}><input name="ogTitleEn" defaultValue={initial?.ogTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.ogTitleAr")}><input name="ogTitleAr" defaultValue={initial?.ogTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.ogDescriptionEn")}><textarea name="ogDescriptionEn" defaultValue={initial?.ogDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.ogDescriptionAr")}><textarea name="ogDescriptionAr" defaultValue={initial?.ogDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.ogImage")}><input type="file" name="ogImage" accept="image/*" className={`${adminInput} file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-cream`} /></AdminField>
        <AdminField label={t("forms.fields.twitterCard")}><input name="twitterCard" defaultValue={initial?.twitterCard ?? "summary_large_image"} placeholder="summary_large_image" className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.twitterTitleEn")}><input name="twitterTitleEn" defaultValue={initial?.twitterTitleEn ?? ""} className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.twitterTitleAr")}><input name="twitterTitleAr" defaultValue={initial?.twitterTitleAr ?? ""} dir="rtl" className={adminInput} /></AdminField>
        <AdminField label={t("forms.fields.twitterDescriptionEn")}><textarea name="twitterDescriptionEn" defaultValue={initial?.twitterDescriptionEn ?? ""} className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.twitterDescriptionAr")}><textarea name="twitterDescriptionAr" defaultValue={initial?.twitterDescriptionAr ?? ""} dir="rtl" className={`${adminInput} min-h-20 resize-y`} /></AdminField>
        <AdminField label={t("forms.fields.twitterHandle")}><input name="twitterHandle" defaultValue={initial?.twitterHandle ?? ""} placeholder="@zidandev" className={adminInput} /></AdminField>
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-white/10 bg-ink-950/80 py-4 backdrop-blur">
        <Link href="/admin/blogs" className={buttonVariants({ variant: "ghost", size: "md", className: "text-ink-300" })}>{t("actions.cancel")}</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md" })}>
          {pending ? <Spinner /> : <Save className="h-4 w-4" />}
          {initial ? t("actions.saveChanges") : t("actions.publishSave")}
        </button>
      </div>
    </form>
  );
}
