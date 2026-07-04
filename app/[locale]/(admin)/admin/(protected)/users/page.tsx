import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { deleteUser } from "@/app/actions/admin-users";
import { DeleteButton } from "@/components/admin/delete-button";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ROLE_COLOR: Record<string, string> = {
  ADMIN: "text-gold-400",
  EDITOR: "text-blue-400",
  AUTHOR: "text-ink-300",
};

export default async function AdminUsersPage() {
  const t = await getTranslations("admin");
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">{t("nav.users")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("lists.users.count", { count: users.length })}</p>
        </div>
        <Link href="/admin/users/new" className={buttonVariants({ variant: "gold", size: "md" })}>
          <Plus className="h-4 w-4" /> {t("actions.newUser")}
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">{t("tables.name")}</th>
              <th className="px-4 py-3">{t("tables.email")}</th>
              <th className="px-4 py-3">{t("tables.role")}</th>
              <th className="px-4 py-3">{t("tables.status")}</th>
              <th className="px-4 py-3">{t("tables.lastLogin")}</th>
              <th className="px-4 py-3 text-right">{t("tables.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u: (typeof users)[number]) => (
              <tr key={u.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-ink-300">{u.email}</td>
                <td className={`px-4 py-3 font-medium ${ROLE_COLOR[u.role] ?? ""}`}>{t(`roles.${u.role}`)}</td>
                <td className="px-4 py-3 text-ink-300">{u.active ? t("statuses.user.active") : t("statuses.user.disabled")}</td>
                <td className="px-4 py-3 text-ink-400">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : t("common.never")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/users/${u.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">{t("actions.edit")}</Link>
                    <DeleteButton action={deleteUser} id={u.id} confirmMessage={t("lists.users.deleteConfirm", { email: u.email })} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
