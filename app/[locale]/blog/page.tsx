import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { PostCard } from "@/components/sections/post-card";
import { getFeaturedPost, getPosts } from "@/content/posts";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

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

  const featured = getFeaturedPost(activeLocale);
  const rest = getPosts(activeLocale).filter((post) => post.slug !== featured?.slug);

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

      <Section tone="light">
        <Container>
          {featured ? (
            <Reveal>
              <PostCard post={featured} locale={activeLocale} featured />
            </Reveal>
          ) : null}

          <div className="mt-14">
            <SectionHeading eyebrow={t("recentEyebrow")} title={t("recentTitle")} />
            <Stagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {rest.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} locale={activeLocale} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
