"use client";

import { Trash2 } from "lucide-react";

/**
 * Wraps a "delete" server action in a form with a confirmation prompt.
 * `action` is the server action reference; `id` is bound to it on submit.
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
  return (
    <form
      action={action.bind(null, id)}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1 text-xs font-medium text-red-400 transition-colors hover:text-red-300"
        title="Delete"
      >
        <Trash2 className="h-3.5 w-3.5" /> Delete
      </button>
    </form>
  );
}
