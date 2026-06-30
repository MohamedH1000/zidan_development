import type { Metadata } from "next";
export const dynamicParams = true;
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Scene } from "@/components/visual/scene";
import { PostCard } from "@/components/sections/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getBlogBySlugFromDB, getBlogsFromDB } from "@/lib/db-content";
import { buildMetadata, getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/utils";
import { localizedPath } from "@/lib/i18n";
import { type Locale } from "@/i18n/routing";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = locale as Locale;
  const post = await getBlogBySlugFromDB(slug, activeLocale);
  if (!post) return buildMetadata({ title: "Article not found", description: "", path: "/blog" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt || "",
    path: localizedPath(activeLocale, `/blog/${post.slug}`),
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const activeLocale = locale as Locale;
  const post = await getBlogBySlugFromDB(slug, activeLocale);
  if (!post) notFound();

  const [t, tCommon, related] = await Promise.all([
    getTranslations("pages.blog"),
    getTranslations("common"),
    getBlogsFromDB(activeLocale).then((p) => p.filter((x) => x.slug !== post.slug).slice(0, 3)).catch(() => []),
  ]);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: t("title"), path: localizedPath(activeLocale, "/blog") },
            { name: post.title, path: localizedPath(activeLocale, `/blog/${post.slug}`) },
          ]),
          getArticleJsonLd({
            title: post.title,
            description: post.excerpt || "",
            path: localizedPath(activeLocale, `/blog/${post.slug}`),
            date: post.date,
            author: post.author,
          }),
        ]}
      />

      <Section tone="dark" className="pt-32 pb-12 sm:pt-40">
        <Container className="max-w-3xl">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-medium text-cream/60 transition-colors hover:text-gold-400">
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {t("backToArticles")}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-cream/60">
              {post.category ? <Badge tone="gold">{post.category}</Badge> : null}
              <time dateTime={post.date}>{formatDate(post.date, activeLocale)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">{post.excerpt}</p>
            ) : null}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {tCommon("by", { author: post.author })}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="pt-14">
        <Container className="max-w-3xl">
          {/* Cover image */}
          {post.coverImageUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImageUrl} alt={post.coverImageAlt || post.title} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
              <Scene variant="blog" showLabel={post.category || ""} />
            </div>
          )}

          {/* Rich HTML body — already sanitized at write time via sanitize-html */}
          <article
            className="prose-blog mt-10 space-y-6 text-base leading-relaxed text-ink-700"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml || "" }}
          />

          {post.tags.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-ink-900/10 pt-6">
              {post.tags.map((tag) => (
                <Badge key={tag} tone="neutral">#{tag}</Badge>
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="cream">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">{t("keepReading")}</h2>
              <Link href="/blog" className={buttonVariants({ variant: "outline", size: "sm" })}>
                {t("allArticles")}
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <PostCard post={item} locale={activeLocale} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
