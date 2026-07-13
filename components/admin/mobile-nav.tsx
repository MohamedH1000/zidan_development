"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, Building2, DoorOpen, Newspaper, Users, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";

/**
 * Admin mobile navigation drawer.
 *
 * The admin protected layout is a Server Component (it reads the session +
 * DB), so the menu renders here as a Client Component that only needs the
 * serializable `{ href, label }[]` + email props. lucide icon components can't
 * cross the server→client boundary, so we map icons by href in this file.
 *
 * Behaviour:
 *  - Toggle button opens/closes with a11y `aria-expanded`/`aria-controls`.
 *  - Clicking any nav link closes the menu immediately, then navigation
 *    proceeds (no stuck-open drawer after a route change).
 *  - A pointerdown outside the panel, or pressing Escape, also closes it.
 */
const ICONS = {
  "/admin": LayoutDashboard,
  "/admin/projects": Building2,
  "/admin/units": DoorOpen,
  "/admin/blogs": Newspaper,
  "/admin/users": Users,
} as const;

type NavItem = { href: string; label: string };

export function MobileNav({ nav, email }: { nav: NavItem[]; email: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeydown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        type="button"
        aria-label="Open admin menu"
        aria-expanded={open}
        aria-controls="admin-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/15 text-ink-200 transition-colors hover:border-gold-500/50 hover:text-gold-400"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="admin-mobile-menu"
          className="absolute start-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/40"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <Logo tone="light" href={null} />
            <p className="mt-2 truncate text-xs text-ink-500">{email}</p>
          </div>
          <nav className="flex flex-col p-2">
            {nav.map((item) => {
              const Icon = ICONS[item.href as keyof typeof ICONS];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink-200 transition-colors hover:bg-white/5 hover:text-cream"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-2">
            <SignOutButton />
          </div>
        </div>
      ) : null}
    </div>
  );
}
