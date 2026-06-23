import { cn } from "@/lib/utils";

/**
 * Centered max-width wrapper enforcing consistent horizontal gutters.
 * Single source of truth for content width across the site.
 */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
