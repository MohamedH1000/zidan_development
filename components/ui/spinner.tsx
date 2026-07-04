import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for inline/button loading spinners across the site.
 * Uses lucide's Loader2 with Tailwind's `animate-spin`. The global
 * `prefers-reduced-motion` rule in globals.css collapses the spin for
 * reduced-motion users, leaving a static icon.
 */
export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} aria-hidden="true" />
  );
}
