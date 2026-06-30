import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Scene } from "@/components/visual/scene";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function PostCard({ post, locale, featured = false }: { post: BlogPost; locale: Locale; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,0.5)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"}`}>
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-110">
            <Scene variant="blog" showLabel={post.category} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />
        <div className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
          {post.category ? <Badge tone="gold">{post.category}</Badge> : null}
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </div>
        <h3 className={`mt-3 font-display font-semibold leading-tight text-ink-900 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className={`mt-3 flex-1 text-sm leading-relaxed text-ink-600 ${featured ? "sm:text-base" : ""}`}>{post.excerpt}</p>
        ) : null}
        <div className="mt-6 flex items-center gap-2 border-t border-ink-900/8 pt-4 text-xs font-medium text-ink-500">
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gold-600" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
