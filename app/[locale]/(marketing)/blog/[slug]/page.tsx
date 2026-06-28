import type { Metadata } from "next";
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
import { getPostBySlug, getPosts, postSlugs } from "@/content/posts";
import { buildMetadata, getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/utils";
import { localizedPath } from "@/lib/i18n";
import { locales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    postSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = locale as Locale;
  const post = getPostBySlug(slug, activeLocale);
  if (!post) return buildMetadata({ title: "Article not found", description: "", path: localizedPath(activeLocale, "/blog") });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
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
  const post = getPostBySlug(slug, activeLocale);
  if (!post) notFound();

  const t = await getTranslations("pages.blog");
  const tCommon = await getTranslations("common");
  const related = getPosts(activeLocale).filter((p) => p.slug !== post.slug).slice(0, 3);

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
            description: post.excerpt,
            path: localizedPath(activeLocale, `/blog/${post.slug}`),
            date: post.date,
            author: post.author,
          }),
        ]}
      />

      <Section tone="dark" className="pt-32 pb-12 sm:pt-40">
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-cream/60 transition-colors hover:text-gold-400"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {t("backToArticles")}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-cream/60">
              <Badge tone="gold">{post.category}</Badge>
              <time dateTime={post.date}>{formatDate(post.date, activeLocale)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-cream text-balance sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">{post.excerpt}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {tCommon("by", { author: post.author })}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="pt-14">
        <Container className="max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
            <Scene variant="blog" showLabel={post.category} />
          </div>
          <article className="mt-10 space-y-6 text-base leading-relaxed text-ink-700">
            {post.content.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-lg text-ink-900" : ""}>
                {paragraph}
              </p>
            ))}
          </article>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-ink-900/10 pt-6">
            {post.tags.map((tag) => (
              <Badge key={tag} tone="neutral">
                #{tag}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

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

      <CtaBand />
    </>
  );
}
