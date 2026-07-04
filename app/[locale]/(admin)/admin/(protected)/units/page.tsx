import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { deleteUnit } from "@/app/actions/admin-units";
import { DeleteButton } from "@/components/admin/delete-button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminUnitsPage() {
  const t = await getTranslations("admin");
  const units = await prisma.unit.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { project: { select: { nameEn: true, slug: true } } },
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">{t("nav.units")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("lists.units.count", { count: units.length })}</p>
        </div>
        <Link href="/admin/units/new" className={buttonVariants({ variant: "gold", size: "md", className: "w-full sm:w-auto" })}>
          <Plus className="h-4 w-4" /> {t("actions.newUnit")}
        </Link>
      </div>

      <div className="-mx-4 mt-6 overflow-x-auto border-y border-white/10 sm:mx-0 sm:mt-8 sm:rounded-2xl sm:border">
        <table className="min-w-[920px] w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">{t("tables.code")}</th>
              <th className="px-4 py-3">{t("tables.project")}</th>
              <th className="px-4 py-3">{t("tables.type")}</th>
              <th className="px-4 py-3">{t("tables.area")}</th>
              <th className="px-4 py-3">{t("tables.beds")}</th>
              <th className="px-4 py-3">{t("tables.baths")}</th>
              <th className="px-4 py-3">{t("tables.availability")}</th>
              <th className="px-4 py-3 text-right">{t("tables.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {units.map((u: (typeof units)[number]) => (
              <tr key={u.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{u.slug}</td>
                <td className="px-4 py-3 text-ink-300">{u.project?.nameEn ?? "—"}</td>
                <td className="px-4 py-3 text-ink-300">{u.unitTypeEn}</td>
                <td className="px-4 py-3 text-ink-300">{u.area} m²</td>
                <td className="px-4 py-3 text-ink-300">{u.bedrooms}</td>
                <td className="px-4 py-3 text-ink-300">{u.bathrooms}</td>
                <td className="px-4 py-3 text-ink-300">{t(`statuses.availability.${u.availability}`)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/units/${u.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">
                      {t("actions.edit")}
                    </Link>
                    <DeleteButton action={deleteUnit} id={u.id} confirmMessage={t("lists.units.deleteConfirm", { slug: u.slug })} />
                  </div>
                </td>
              </tr>
            ))}
            {units.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-500">
                  {t("lists.units.empty")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
