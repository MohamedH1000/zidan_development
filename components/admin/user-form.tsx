"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Save } from "lucide-react";
import type { AdminUser } from "@prisma/client";
import { saveUser, type UserFormState } from "@/app/actions/admin-users";
import { AdminField, AdminSection, adminInput } from "@/components/admin/field";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@/i18n/navigation";

const ROLES = [
  { value: "ADMIN", label: "Admin — full access" },
  { value: "EDITOR", label: "Editor — manage all content" },
  { value: "AUTHOR", label: "Author — own content only" },
];

export function UserForm({ initial }: { initial?: AdminUser }) {
  const t = useTranslations("admin");
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(saveUser, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      {state?.error ? (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{state.error}</p>
      ) : null}

      <AdminField label={t("tables.name")}>
        <input name="name" defaultValue={initial?.name ?? ""} className={adminInput} />
      </AdminField>
      <AdminField label={t("forms.fields.emailRequired")}>
        <input name="email" type="email" required defaultValue={initial?.email ?? ""} className={adminInput} />
      </AdminField>
      <AdminField label={t("tables.role")}>
        <select name="role" defaultValue={initial?.role ?? "AUTHOR"} className={adminInput}>
          {ROLES.map((r) => <option key={r.value} value={r.value}>{t(`roleDescriptions.${r.value}`)}</option>)}
        </select>
      </AdminField>
      <AdminField
        label={initial ? t("forms.fields.newPasswordOptional") : t("forms.fields.passwordRequired")}
        hint={initial ? t("forms.hints.keepPassword") : t("forms.hints.minPassword")}
      >
        <input name="password" type="password" required={!initial} minLength={initial ? 0 : 8} placeholder="••••••••" className={adminInput} />
      </AdminField>

      <AdminSection title={t("tables.status")} />
      <label className="inline-flex items-center gap-2 text-sm text-ink-300">
        <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 rounded border-white/20 text-gold-500" />
        {t("forms.fields.activeCanSignIn")}
      </label>

      <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
        <Link href="/admin/users" className={buttonVariants({ variant: "ghost", size: "md", className: "justify-center text-ink-300" })}>{t("actions.cancel")}</Link>
        <button type="submit" disabled={pending} className={buttonVariants({ variant: "gold", size: "md", className: "justify-center" })}>
          {pending ? <Spinner /> : <Save className="h-4 w-4" />}
          {initial ? t("actions.saveUser") : t("actions.createUser")}
        </button>
      </div>
    </form>
  );
}
