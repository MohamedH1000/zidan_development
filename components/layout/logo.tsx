import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Brand wordmark. A geometric "Z" monogram (a stylised building corner) paired
 * with the wordmark set in the display serif. Tonal variants for dark/light
 * surfaces. Pure markup — no external asset required.
 */
export function Logo({
  tone = "light",
  className,
  href = "/",
}: {
  tone?: "light" | "dark";
  className?: string;
  href?: string | null;
}) {
  const textColor = tone === "light" ? "text-cream" : "text-ink-900";
  const subColor = tone === "light" ? "text-gold-400" : "text-gold-600";

  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <rect x="1" y="1" width="38" height="38" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.25" className={textColor} />
          <path d="M12 13 H28 L14 27 H28" fill="none" stroke="#c8a45c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-bold tracking-wide", textColor)}>
          ZIDAN
        </span>
        <span className={cn("text-[0.6rem] font-medium uppercase tracking-[0.32em]", subColor)}>
          Development
        </span>
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Zidan Development — home" className="inline-flex">
      {content}
    </Link>
  );
}
