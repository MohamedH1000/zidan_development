import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Edit project</h1>
      <p className="mt-1 text-sm text-ink-400">{project.nameEn} · /{project.slug}</p>
      <div className="mt-6 max-w-4xl">
        <ProjectForm initial={project} />
      </div>
    </div>
  );
}
