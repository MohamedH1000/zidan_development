import { cn } from "@/lib/utils";

/** Generic surface card with consistent radius, border and hover lift. */
export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_40px_-30px_rgba(0,0,0,0.35)]",
        interactive &&
          "transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
