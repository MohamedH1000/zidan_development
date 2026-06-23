import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Scene } from "@/components/visual/scene";

type Crumb = { label: string; href?: string };

/**
 * Dark hero band used at the top of inner pages. Keeps a dark surface behind
 * the transparent header on every route for a consistent, premium feel.
 */
export async function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  sceneVariant = "abstract",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  sceneVariant?: "abstract" | "project" | "blog";
}) {
  const tNav = await getTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-32 pb-16 text-cream sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 opacity-30">
        <Scene variant={sceneVariant} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/60 to-ink-950" />

      <Container className="relative">
        <Reveal direction="up">
          {crumbs.length > 0 ? (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/50">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold-400">
                    {tNav("home")}
                  </Link>
                </li>
                {crumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-gold-500/60 rtl:rotate-180" />
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-gold-400">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-cream/80">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-8 bg-gold-400/60" />
              {eyebrow}
            </span>
          ) : null}

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">{description}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
