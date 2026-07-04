"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Spinner } from "@/components/ui/spinner";
import { LanguageToggle } from "@/components/admin/language-toggle";

export function LoginForm() {
  const t = useTranslations("admin.login");
  const params = useSearchParams();
  const error = params.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      signIn("credentials", { email, password, callbackUrl: "/admin" });
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5 text-cream">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <Logo tone="light" href={null} />
          <LanguageToggle />
        </div>
        <div className="rounded-2xl border border-white/10 bg-ink-900 p-7 shadow-2xl">
          <h1 className="font-display text-2xl font-semibold">{t("title")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("subtitle")}</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
                {t("email")}
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-950 px-4 py-2.5 text-sm text-cream placeholder:text-ink-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-400">
                {t("password")}
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-950 px-4 py-2.5 text-sm text-cream placeholder:text-ink-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                placeholder={t("passwordPlaceholder")}
              />
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-400">{t("invalid")}</p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold-500 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
            >
              {pending ? (
                <Spinner />
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> {t("submit")}
                </>
              )}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-ink-500">
          {t("createAdminHint")} <code className="text-ink-300">npm run seed:admin</code>
        </p>
      </div>
    </div>
  );
}
