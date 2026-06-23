import { cn } from "@/lib/utils";

/**
 * Consistent section header: small gold eyebrow + display headline + lead copy.
 * `tone="dark"` inverts colors for use on dark sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]",
            isDark ? "text-gold-400" : "text-gold-600",
          )}
        >
          <span className={cn("h-px w-8", isDark ? "bg-gold-400/60" : "bg-gold-500/60")} />
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={cn(
          "max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl",
          isDark ? "text-cream" : "text-ink-900",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            isDark ? "text-cream/70" : "text-ink-600",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
