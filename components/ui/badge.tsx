import { cn } from "@/lib/utils";

/** Small pill/tag used for keywords, statuses and meta labels. */
export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "gold" | "dark" | "outline";
}) {
  const tones = {
    neutral: "bg-ink-900/5 text-ink-700",
    gold: "bg-gold-500/15 text-gold-700",
    dark: "bg-ink-900 text-cream",
    outline: "border border-gold-500/40 text-gold-700",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
