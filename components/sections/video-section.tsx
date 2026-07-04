import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { DeferredIframe } from "@/components/ui/deferred-iframe";

/**
 * Brand showreel. The YouTube iframe is click-to-load so the third-party
 * player JS does not execute during the initial page load.
 */
export async function VideoSection() {
  const t = await getTranslations("home.video");
  const src = `https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}?rel=0&modestbranding=1`;
  const watchUrl = `https://www.youtube.com/watch?v=${siteConfig.video.youtubeId}`;
  const poster = `https://i.ytimg.com/vi/${siteConfig.video.youtubeId}/hqdefault.jpg`;

  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <Reveal className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("subtitle")}
        />
      </Reveal>
      <Reveal delay={0.1} className="relative mt-12">
        <div className="mx-auto max-w-5xl">
          <DeferredIframe
            className="aspect-video rounded-2xl border border-white/10 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.85)] ring-1 ring-gold-500/20"
            src={src}
            title={t("title")}
            buttonLabel={t("play")}
            fallbackHref={watchUrl}
            poster={{ src: poster, alt: t("title"), sizes: "(min-width: 1024px) 960px, 100vw" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          >
            <span className="max-w-xl font-display text-2xl font-semibold text-cream sm:text-3xl">
              {t("title")}
            </span>
          </DeferredIframe>
        </div>
      </Reveal>
    </Section>
  );
}
