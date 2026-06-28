import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UnitForm } from "@/components/admin/unit-form";

export default async function EditUnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [unit, projects] = await Promise.all([
    prisma.unit.findUnique({ where: { id } }),
    prisma.project.findMany({ orderBy: { nameEn: "asc" }, select: { id: true, nameEn: true } }),
  ]);
  if (!unit) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Edit unit</h1>
      <p className="mt-1 text-sm text-ink-400">{unit.slug}</p>
      <div className="mt-6 max-w-3xl">
        <UnitForm initial={unit} projects={projects} />
      </div>
    </div>
  );
}
