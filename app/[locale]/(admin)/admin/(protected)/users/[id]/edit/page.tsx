import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserForm } from "@/components/admin/user-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Edit user</h1>
      <p className="mt-1 text-sm text-ink-400">{user.email}</p>
      <div className="mt-6">
        <UserForm initial={user} />
      </div>
    </div>
  );
}
