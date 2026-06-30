"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import type { AdminUser } from "@prisma/client";
import { saveUser, type UserFormState } from "@/app/actions/admin-users";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const ROLES = [
  { value: "ADMIN", label: "Admin — full access" },
  { value: "EDITOR", label: "Editor — manage all content" },
  { value: "AUTHOR", label: "Author — own content only" },
];

export function UserForm({ initial }: { initial?: AdminUser }) {
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(saveUser, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminField label="Name">
        <input name="name" defaultValue={initial?.name ?? ""} className={adminInput} />
      </AdminField>
      <AdminField label="Email *">
        <input name="email" type="email" required defaultValue={initial?.email ?? ""} className={adminInput} />
      </AdminField>
      <AdminField label="Role">
        <select name="role" defaultValue={initial?.role ?? "AUTHOR"} className={adminInput}>
          {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </AdminField>
      <AdminField
        label={initial ? "New password (optional)" : "Password *"}
        hint={initial ? "Leave blank to keep the current password." : "Min 8 characters."}
      >
        <input name="password" type="password" required={!initial} minLength={initial ? 0 : 8} placeholder="••••••••" className={adminInput} />
      </AdminField>

      <AdminSection title="Status" />
      <label className="inline-flex items-center gap-2 text-sm text-ink-300">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 rounded border-white/20 text-gold-500" />
        Active (can sign in)
      </label>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link href="/admin/users" className={buttonVariants({ variant: "ghost", size: "md", className: "text-ink-300" })}>Cancel</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md" })}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial ? "Save user" : "Create user"}
        </button>
      </div>
    </form>
  );
}
