import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
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
        <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-110">
          <Scene variant="blog" showLabel={post.category} />
        </div>
        <div className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-center gap-3 text-xs text-ink-500">
          <Badge tone="gold">{post.category}</Badge>
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </div>
        <h3 className={`mt-3 font-display font-semibold leading-tight text-ink-900 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-500">
          <Clock className="h-3.5 w-3.5 text-gold-600" />
          {post.readingTime}
        </div>
      </div>
    </Link>
  );
}
