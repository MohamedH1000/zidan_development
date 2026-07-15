import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { authOptions } from "@/lib/auth";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { LayoutDashboard, Building2, DoorOpen, Newspaper, Users } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { LanguageToggle } from "@/components/admin/language-toggle";
import { MobileNav } from "@/components/admin/mobile-nav";
import { Logo } from "@/components/layout/logo";

// Admin pages are always rendered on demand (session + DB).
export const dynamic = "force-dynamic";

// The whole admin area is private — never indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR" && session.user.role !== "AUTHOR")) {
    redirect(localizedPath(locale as Locale, "/admin/login"));
  }

  const tNav = await getTranslations("admin.nav");
  const tHeader = await getTranslations("admin.header");

  const nav = [
    { href: "/admin", label: tNav("dashboard"), icon: LayoutDashboard },
    { href: "/admin/projects", label: tNav("projects"), icon: Building2 },
    { href: "/admin/units", label: tNav("units"), icon: DoorOpen },
    { href: "/admin/blogs", label: tNav("blogs"), icon: Newspaper },
    ...(session.user.role === "ADMIN"
      ? [{ href: "/admin/users", label: tNav("users"), icon: Users }]
      : []),
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

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-ink-900 px-4 py-3 sm:px-6 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <MobileNav
              nav={nav.map(({ href, label }) => ({ href, label }))}
              email={session.user.email ?? ""}
            />
            <p className="truncate font-display text-base font-semibold sm:text-lg">{tHeader("title")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <LanguageToggle />
            <Link href="/" className="text-xs font-medium text-gold-400 hover:text-gold-300">
              {tHeader("viewSite")}
            </Link>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
