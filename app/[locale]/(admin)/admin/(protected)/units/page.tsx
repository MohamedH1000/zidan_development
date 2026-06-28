import { prisma } from "@/lib/prisma";
import { deleteUnit } from "@/app/actions/admin-units";
import { DeleteButton } from "@/components/admin/delete-button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminUnitsPage() {
  const units = await prisma.unit.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { project: { select: { nameEn: true, slug: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Units</h1>
          <p className="mt-1 text-sm text-ink-400">{units.length} unit(s)</p>
        </div>
        <Link href="/admin/units/new" className={buttonVariants({ variant: "gold", size: "md" })}>
          <Plus className="h-4 w-4" /> New unit
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Beds</th>
              <th className="px-4 py-3">Baths</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {units.map((u) => (
              <tr key={u.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{u.slug}</td>
                <td className="px-4 py-3 text-ink-300">{u.project?.nameEn ?? "—"}</td>
                <td className="px-4 py-3 text-ink-300">{u.unitTypeEn}</td>
                <td className="px-4 py-3 text-ink-300">{u.area} m²</td>
                <td className="px-4 py-3 text-ink-300">{u.bedrooms}</td>
                <td className="px-4 py-3 text-ink-300">{u.bathrooms}</td>
                <td className="px-4 py-3 text-ink-300">{u.availability}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/units/${u.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">
                      Edit
                    </Link>
                    <DeleteButton action={deleteUnit} id={u.id} confirmMessage={`Delete unit "${u.slug}"?`} />
                  </div>
                </td>
              </tr>
            ))}
            {units.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-500">
                  No units yet. Click <span className="text-gold-400">New unit</span> to add one.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
