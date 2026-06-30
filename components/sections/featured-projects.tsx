import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjectsFromDB } from "@/lib/db-content";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ProjectCard } from "./project-card";
import { buttonVariants } from "@/components/ui/button";

export async function FeaturedProjects() {
  const locale = (await getLocale()) as "en" | "ar";
  let featured: Awaited<ReturnType<typeof getFeaturedProjectsFromDB>> = [];
  try {
    featured = await getFeaturedProjectsFromDB(locale);
  } catch {
    featured = [];
  }
  const t = await getTranslations("home.projects");
  const tCommon = await getTranslations("common");

  // If no featured projects in DB, hide the section entirely.
  if (featured.length === 0) return null;

  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/projects" className={buttonVariants({ variant: "outline", size: "md" })}>
              {tCommon("viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {featured.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
