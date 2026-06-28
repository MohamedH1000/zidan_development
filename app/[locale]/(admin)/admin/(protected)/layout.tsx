import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Link } from "@/i18n/navigation";
import { authOptions } from "@/lib/auth";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { LayoutDashboard, Building2, DoorOpen } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { Logo } from "@/components/layout/logo";

// Admin pages are always rendered on demand (session + DB).
export const dynamic = "force-dynamic";

/**
 * Protects all /admin/* pages (except /admin/login, which lives outside this
 * route group). Redirects unauthenticated or non-admin users to the login.
 */
export default async function AdminProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect(localizedPath(locale as Locale, "/admin/login"));
  }

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: Building2 },
    { href: "/admin/units", label: "Units", icon: DoorOpen },
  ];

  return (
    <div className="flex min-h-screen bg-ink-950 text-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-e border-white/10 bg-ink-900 p-5 lg:flex">
        <div className="pb-6">
          <Logo tone="light" href={null} />
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-white/5 hover:text-cream"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-3">
          <p className="truncate px-3 pb-1 text-xs text-ink-500">{session.user.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-ink-900 px-6 py-4">
          <p className="font-display text-lg font-semibold">Zidan Admin</p>
          <Link href="/" className="text-xs font-medium text-gold-400 hover:text-gold-300">
            View site ↗
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
