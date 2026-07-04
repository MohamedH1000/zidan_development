import { getTranslations } from "next-intl/server";
import { UserForm } from "@/components/admin/user-form";

export default async function NewUserPage() {
  const t = await getTranslations("admin.pages");

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">{t("newUserTitle")}</h1>
      <p className="mt-1 text-sm text-ink-400">{t("newUserSubtitle")}</p>
      <div className="mt-6">
        <UserForm />
      </div>
    </div>
  );
}
