import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/app/actions/admin-projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const t = await getTranslations("admin");
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { units: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">{t("nav.projects")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("lists.projects.count", { count: projects.length })}</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ variant: "gold", size: "md" })}>
          <Plus className="h-4 w-4" /> {t("actions.newProject")}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">{t("tables.name")}</th>
              <th className="px-4 py-3">{t("tables.slug")}</th>
              <th className="px-4 py-3">{t("tables.status")}</th>
              <th className="px-4 py-3">{t("tables.units")}</th>
              <th className="px-4 py-3">{t("tables.featured")}</th>
              <th className="px-4 py-3 text-right">{t("tables.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((p: (typeof projects)[number]) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{p.nameEn}</td>
                <td className="px-4 py-3 text-ink-400">{p.slug}</td>
                <td className="px-4 py-3 text-ink-300">{t(`statuses.project.${p.status}`)}</td>
                <td className="px-4 py-3 text-ink-300">{p._count.units}</td>
                <td className="px-4 py-3 text-ink-300">{p.featured ? "★" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/projects/${p.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">
                      {t("actions.edit")}
                    </Link>
                    <DeleteButton action={deleteProject} id={p.id} confirmMessage={t("lists.projects.deleteConfirm", { name: p.nameEn })} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-500">
                  {t("lists.projects.empty")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
