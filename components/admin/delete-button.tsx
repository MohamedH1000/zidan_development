"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

/**
 * Wraps a "delete" server action with a confirmation prompt and a pending
 * state. `action` is the server action reference; `id` is passed to it on
 * confirm. A Spinner replaces the trash icon while the deletion is in flight.
 */
export function DeleteButton({
  action,
  id,
  confirmMessage,
}: {
  action: (id: string) => Promise<void>;
  id: string;
  confirmMessage?: string;
}) {
  const t = useTranslations("admin.actions");
  const [pending, startTransition] = useTransition();
  const message = confirmMessage ?? t("confirmDelete");

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(message)) return;
        startTransition(() => {
          void action(id);
        });
      }}
      className="inline-flex items-center gap-1 text-xs font-medium text-red-400 transition-colors hover:text-red-300 disabled:opacity-60"
      title={t("delete")}
    >
      {pending ? <Spinner className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />} {t("delete")}
    </button>
  );
}
