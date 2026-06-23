import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "dark" | "gold" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-950 text-cream hover:bg-ink-800 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:shadow-[0_14px_40px_-12px_rgba(0,0,0,0.7)] hover:-translate-y-0.5",
  dark: "bg-ink-900 text-cream hover:bg-ink-800 hover:-translate-y-0.5",
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_12px_34px_-12px_rgba(200,164,92,0.7)] hover:-translate-y-0.5",
  outline:
    "border border-gold-500/70 text-ink-900 hover:bg-gold-500 hover:text-ink-950 hover:border-gold-500",
  ghost: "text-ink-900 hover:bg-ink-900/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

/** Shared class string so anchors and buttons stay visually identical. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/**
 * Renders a <button> by default, or an <a> when `href` is supplied.
 * For internal navigation use <Link className={buttonVariants(...)} />.
 */
export function Button({
  variant,
  size,
  className,
  href,
  ...props
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
)) {
  const classes = buttonVariants({ variant, size, className });
  if (typeof href === "string") {
    return <a className={classes} href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
