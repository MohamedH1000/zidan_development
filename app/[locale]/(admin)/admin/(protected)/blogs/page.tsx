import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { deleteBlog } from "@/app/actions/admin-blogs";
import { DeleteButton } from "@/components/admin/delete-button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  DRAFT: "text-ink-400",
  PUBLISHED: "text-emerald-400",
  SCHEDULED: "text-blue-400",
  ARCHIVED: "text-red-400",
};

export default async function AdminBlogsPage() {
  const t = await getTranslations("admin");
  const blogs = await prisma.blog.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">{t("lists.blogs.title")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("lists.blogs.count", { count: blogs.length })}</p>
        </div>
        <Link href="/admin/blogs/new" className={buttonVariants({ variant: "gold", size: "md" })}>
          <Plus className="h-4 w-4" /> {t("actions.newPost")}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">{t("tables.title")}</th>
              <th className="px-4 py-3">{t("tables.status")}</th>
              <th className="px-4 py-3">{t("tables.category")}</th>
              <th className="px-4 py-3">{t("tables.author")}</th>
              <th className="px-4 py-3 text-right">{t("tables.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.map((b: (typeof blogs)[number]) => (
              <tr key={b.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{b.titleEn}</td>
                <td className={`px-4 py-3 font-medium ${STATUS_COLOR[b.status] ?? ""}`}>{t(`statuses.blog.${b.status}`)}</td>
                <td className="px-4 py-3 text-ink-300">{b.category ?? "—"}</td>
                <td className="px-4 py-3 text-ink-300">{b.author?.name ?? b.author?.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/blogs/${b.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">{t("actions.edit")}</Link>
                    <DeleteButton action={deleteBlog} id={b.id} confirmMessage={t("lists.blogs.deleteConfirm", { title: b.titleEn })} />
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-500">
                  {t("lists.blogs.empty")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
