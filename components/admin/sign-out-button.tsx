"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const t = useTranslations("admin.common");
  return (
    <button
      type="submit"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-white/5 hover:text-cream"
    >
      <LogOut className="h-4 w-4" />
      {t("signOut")}
    </button>
  );
}
