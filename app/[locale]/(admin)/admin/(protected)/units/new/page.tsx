import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { UnitForm } from "@/components/admin/unit-form";

export default async function NewUnitPage() {
  const t = await getTranslations("admin.pages");
  const projects = await prisma.project.findMany({
    orderBy: { nameEn: "asc" },
    select: { id: true, nameEn: true },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">{t("newUnitTitle")}</h1>
      <p className="mt-1 text-sm text-ink-400">
        {t("newUnitSubtitle")}
        {projects.length === 0 ? (
          <span className="text-red-400"> {t("createProjectFirst")}</span>
        ) : null}
      </p>
      <div className="mt-6 max-w-3xl">
        <UnitForm projects={projects} />
      </div>
    </div>
  );
}
