import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getCompany } from "@/content/company";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";

export async function CtaBand() {
  const locale = (await getLocale()) as "en" | "ar";
  const company = getCompany(locale);
  const t = await getTranslations("home.cta");
  const tCommon = await getTranslations("common");

  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <span className="font-script text-3xl text-gold-400">{company.socialProof.headline}</span>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-cream/65">{company.socialProof.subtext}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ variant: "gold", size: "lg" })}>
              {tCommon("contactNow")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/projects"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "border-cream/30 text-cream hover:bg-cream hover:text-ink-950 hover:border-cream",
              })}
            >
              {tCommon("exploreProjects")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
