import { getTranslations } from "next-intl/server";
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProjectPage() {
  const t = await getTranslations("admin.pages");

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">{t("newProjectTitle")}</h1>
      <p className="mt-1 text-sm text-ink-400">{t("newProjectSubtitle")}</p>
      <div className="mt-6 max-w-4xl">
        <ProjectForm />
      </div>
    </div>
  );
}
