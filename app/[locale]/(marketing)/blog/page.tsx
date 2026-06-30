import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { PostCard } from "@/components/sections/post-card";
import { getBlogsFromDB } from "@/lib/db-content";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: localizedPath(locale as Locale, "/blog"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");

  let featured: BlogPost | null = null;
  let rest: BlogPost[] = [];
  try {
    const posts = await getBlogsFromDB(activeLocale);
    featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
    rest = posts.filter((post) => post.slug !== featured?.slug);
  } catch (error) {
    console.error("Failed to load published blog posts", error);
  }

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: tNav("blogs"), path: localizedPath(activeLocale, "/blog") },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[{ label: tNav("blogs") }]}
        sceneVariant="blog"
      />

      <Section tone="light" className="relative overflow-hidden">
        <Container>
          {featured || rest.length > 0 ? (
            <>
              {featured ? (
                <Reveal>
                  <PostCard post={featured} locale={activeLocale} featured />
                </Reveal>
              ) : null}

              {rest.length > 0 ? (
                <div className="mt-14">
                  <SectionHeading eyebrow={t("recentEyebrow")} title={t("recentTitle")} description={t("description")} />
                  <Stagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                    {rest.map((post) => (
                      <StaggerItem key={post.slug}>
                        <PostCard post={post} locale={activeLocale} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-ink-900/8 bg-white p-10 text-center shadow-[0_24px_70px_-50px_rgba(0,0,0,0.45)] sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">{t("recentEyebrow")}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">{t("emptyTitle")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{t("emptyBody")}</p>
            </div>
          )}
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
