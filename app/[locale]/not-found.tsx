import { getTranslations } from "next-intl/server";
import { Home, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Scene } from "@/components/visual/scene";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink-950 text-cream">
      <div className="absolute inset-0 opacity-25">
        <Scene variant="abstract" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 to-ink-950" />
      <Container className="relative py-24 text-center">
        <p className="font-script text-3xl text-gold-400">{t("script")}</p>
        <h1 className="mt-2 font-display text-7xl font-semibold tracking-tight sm:text-8xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/70">{t("description")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ variant: "gold", size: "lg" })}>
            <Home className="h-4 w-4" /> {tCommon("backHome")}
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-cream/30 text-cream hover:bg-cream hover:text-ink-950 hover:border-cream",
            })}
          >
            <Phone className="h-4 w-4" /> {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
