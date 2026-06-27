import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Brand showreel — embeds the same YouTube video used on the original
 * WordPress site via the privacy-friendly youtube-nocookie domain, lazy-loaded
 * inside a responsive 16:9 frame. `frame-src` for youtube-nocookie/youtube is
 * allow-listed in next.config.ts CSP.
 */
export async function VideoSection() {
  const t = await getTranslations("home.video");
  const src = `https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}?rel=0&modestbranding=1`;

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
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.85)] ring-1 ring-gold-500/20">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={src}
              title={t("title")}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
