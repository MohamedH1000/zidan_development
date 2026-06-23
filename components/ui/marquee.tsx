"use client";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Content is duplicated so the CSS translateX(-50%)
 * animation loops without a visible seam. Pauses on hover, respects reduced
 * motion (animation is disabled globally via globals.css).
 */
export function Marquee({
  items,
  className,
  reverse = false,
  separator,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: React.ReactNode;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-xl text-ink-900/80 sm:text-2xl">
              {item}
            </span>
            {separator ?? <span className="text-gold-500">✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
