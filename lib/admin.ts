import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

/**
 * Authorisation guard for admin Server Actions. Server actions are reachable
 * by URL, so we re-check the session here (not just in the admin layout).
 * Throws NEXT_REDIRECT if not an admin.
 */
export async function requireAdmin(locale: Locale = "en") {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect(localizedPath(locale, "/admin/login"));
  }
  return session;
}
