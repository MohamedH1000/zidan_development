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
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Users</h1>
          <p className="mt-1 text-sm text-ink-400">{users.length} user(s)</p>
        </div>
        <Link href="/admin/users/new" className={buttonVariants({ variant: "gold", size: "md" })}>
          <Plus className="h-4 w-4" /> New user
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last login</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u: (typeof users)[number]) => (
              <tr key={u.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-cream">{u.name ?? "—"}</td>
                <td className="px-4 py-3 text-ink-300">{u.email}</td>
                <td className={`px-4 py-3 font-medium ${ROLE_COLOR[u.role] ?? ""}`}>{u.role}</td>
                <td className="px-4 py-3 text-ink-300">{u.active ? "Active" : "Disabled"}</td>
                <td className="px-4 py-3 text-ink-400">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/users/${u.id}/edit`} className="text-xs font-medium text-gold-400 hover:text-gold-300">Edit</Link>
                    <DeleteButton action={deleteUser} id={u.id} confirmMessage={`Delete user ${u.email}?`} />
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
