import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/blog-form";

export default async function NewBlogPage() {
  const [session, projects] = await Promise.all([
    getServerSession(authOptions),
    prisma.project.findMany({ orderBy: { nameEn: "asc" }, select: { id: true, nameEn: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">New blog post</h1>
      <p className="mt-1 text-sm text-ink-400">Write a professional article with the rich editor.</p>
      <div className="mt-6 max-w-5xl">
        <BlogForm projects={projects} authorId={session?.user?.id ?? ""} />
      </div>
    </div>
  );
}
