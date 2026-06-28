import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [blog, projects, session] = await Promise.all([
    prisma.blog.findUnique({ where: { id } }),
    prisma.project.findMany({ orderBy: { nameEn: "asc" }, select: { id: true, nameEn: true } }),
    getServerSession(authOptions),
  ]);
  if (!blog) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Edit blog post</h1>
      <p className="mt-1 text-sm text-ink-400">{blog.titleEn} · /{blog.slug}</p>
      <div className="mt-6 max-w-5xl">
        <BlogForm initial={blog} projects={projects} authorId={session?.user?.id ?? blog.authorId} />
      </div>
    </div>
  );
}
