import { getTranslations } from "next-intl/server";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DeferredIframe } from "@/components/ui/deferred-iframe";
import { ContactForm } from "@/components/forms/contact-form";

export async function ContactSection() {
  const t = await getTranslations("pages.contact");

  return (
    <Section tone="cream" id="contact">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              <span className="h-px w-8 bg-gold-500/60" />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 text-balance sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{t("description")}</p>

            <dl className="mt-10 space-y-6">
              <ContactRow icon={Phone} label={t("callUs")} value={siteConfig.contact.phoneDisplay} href={`tel:${siteConfig.contact.phone}`} />
              <ContactRow icon={Mail} label={t("email")} value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
              <ContactRow
                icon={MapPin}
                label={t("visitUs")}
                value={`${siteConfig.contact.address.region}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.country}`}
                href={siteConfig.contact.mapsUrl}
              />
            </dl>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[0_24px_70px_-48px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between gap-4 border-b border-ink-900/8 bg-ink-950 px-4 py-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold-400" />
                  <div>
                    <span className="text-sm font-medium text-cream">{t("openInMaps")}</span>
                    <p className="text-xs text-cream/55">
                      {siteConfig.contact.address.region} · {siteConfig.contact.address.city}
                    </p>
                  </div>
                </div>
                <a
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-gold-500 px-4 text-xs font-semibold text-ink-950 transition-colors hover:bg-gold-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t("openInMaps")}
                </a>
              </div>

              <DeferredIframe
                className="h-[320px] w-full bg-sand"
                title="Zidan Development location map"
                src={siteConfig.contact.mapEmbedUrl}
                buttonLabel={t("openInMaps")}
                fallbackHref={siteConfig.contact.mapsUrl}
                referrerPolicy="no-referrer-when-downgrade"
              >
                <span className="font-display text-2xl font-semibold text-cream">
                  {siteConfig.contact.address.region}
                </span>
                <span className="max-w-sm text-sm leading-relaxed text-cream/75">
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
                </span>
              </DeferredIframe>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)] sm:p-8">
              <ContactForm compact />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</dt>
        <dd className="mt-0.5 break-words font-display text-base leading-snug text-ink-900 sm:text-lg">
          {value}
        </dd>
      </div>
    </div>
  );

  if (!href) return content;
  return (
    <a href={href} className="block transition-opacity hover:opacity-80" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}
