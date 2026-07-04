"use client";

import { useTransition } from "react";
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
  confirmMessage = "Delete this item? This cannot be undone.",
}: {
  action: (id: string) => Promise<void>;
  id: string;
  confirmMessage?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(() => {
          void action(id);
        });
      }}
      className="inline-flex items-center gap-1 text-xs font-medium text-red-400 transition-colors hover:text-red-300 disabled:opacity-60"
      title="Delete"
    >
      {pending ? <Spinner className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />} Delete
    </button>
  );
}
