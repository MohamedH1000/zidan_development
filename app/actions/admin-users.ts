"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AdminRole } from "@prisma/client";

export type UserFormState = { error?: string } | undefined;

const ROLES = ["ADMIN", "EDITOR", "AUTHOR"] as const;

function str(fd: FormData, k: string): string {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}

export async function saveUser(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  await requireAdmin();

  const id = str(formData, "id");
  const email = str(formData, "email").toLowerCase();
  const name = str(formData, "name");
  const role = (ROLES as readonly string[]).includes(str(formData, "role"))
    ? (str(formData, "role") as AdminRole)
    : "AUTHOR";
  const active = formData.get("active") === "on";
  const password = str(formData, "password");

  if (!email) return { error: "Email is required." };

  try {
    if (id) {
      // Guard: never leave zero active admins.
      const current = await prisma.adminUser.findUnique({ where: { id } });
      if (current?.role === "ADMIN" && current.active && (role !== "ADMIN" || !active)) {
        const otherAdmins = await prisma.adminUser.count({ where: { role: "ADMIN", active: true, NOT: { id } } });
        if (otherAdmins === 0) return { error: "Cannot demote/disable the last active admin." };
      }

      const data: Record<string, unknown> = { email, name: name || null, role, active };
      if (password) {
        if (password.length < 8) return { error: "Password must be at least 8 characters." };
        data.passwordHash = await bcrypt.hash(password, 10);
        data.passwordChangedAt = new Date();
      }
      await prisma.adminUser.update({ where: { id }, data });
    } else {
      if (!password) return { error: "Initial password is required." };
      if (password.length < 8) return { error: "Password must be at least 8 characters." };
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.adminUser.create({
        data: { email, name: name || null, role, active, passwordHash, passwordChangedAt: new Date() },
      });
    }
  } catch (error) {
    const msg = (error as Error).message ?? "Failed to save user.";
    return { error: /unique|constraint/i.test(msg) ? "Email already in use." : msg };
  }

  redirect("/admin/users");
}

export async function deleteUser(id: string): Promise<void> {
  await requireAdmin();
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (target?.role === "ADMIN") {
    const otherAdmins = await prisma.adminUser.count({ where: { role: "ADMIN", NOT: { id } } });
    if (otherAdmins === 0) throw new Error("Cannot delete the last admin.");
  }
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
