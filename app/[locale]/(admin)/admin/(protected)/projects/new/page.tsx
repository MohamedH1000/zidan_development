import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">New project</h1>
      <p className="mt-1 text-sm text-ink-400">Add a new project area with full bilingual details.</p>
      <div className="mt-6 max-w-4xl">
        <ProjectForm />
      </div>
    </div>
  );
}
