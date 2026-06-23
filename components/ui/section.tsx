import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionTone = "light" | "cream" | "dark" | "gold";

const toneStyles: Record<SectionTone, string> = {
  light: "bg-ivory text-ink-900",
  cream: "bg-cream text-ink-900",
  dark: "bg-ink-950 text-cream",
  gold: "bg-gold-500 text-ink-950",
};

/**
 * Vertical-rhythm section with tone presets. Owns the inner Container so pages
 * stay declarative — a page is just a list of <Section> blocks.
 */
export function Section({
  id,
  tone = "light",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-24 lg:py-32", toneStyles[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
