"use client";

import { cn } from "@/lib/utils";

/**
 * Animated keyword wall — multiple rows of brand-value tags scrolling
 * horizontally ("beside each other"), alternating direction, with an edge
 * fade. Replaces the architectural SVG in the "Excellence" section to mirror
 * the floating keyword tags on the original WordPress site.
 *
 * Motion is disabled automatically under prefers-reduced-motion (globals.css),
 * in which case the tags render as a static wrapped cloud.
 */
const ROW_SPEEDS = [34, 42, 28]; // seconds — organic variation per row

export function MovingTags({ rows }: { rows: string[][] }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {rows.map((row, rowIndex) => {
        const reverse = rowIndex % 2 === 1;
        const speed = ROW_SPEEDS[rowIndex % ROW_SPEEDS.length];
        // Repeat the group enough to fill wide screens, then duplicate the set
        // so the translateX(-50%) marquee loops seamlessly.
        const set = [...row, ...row, ...row];
        const doubled = [...set, ...set];

        return (
          <div
            key={rowIndex}
            className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          >
            <div
              className={cn(
                "flex shrink-0 items-center gap-3 pe-3 group-hover:[animation-play-state:paused]",
                reverse ? "animate-marquee-reverse" : "animate-marquee",
              )}
              style={{ animationDuration: `${speed}s` }}
            >
              {doubled.map((tag, idx) => {
                const filled = idx % 3 === 0; // rhythmic gold accents
                return (
                  <span
                    key={`${tag}-${idx}`}
                    className={cn(
                      "whitespace-nowrap rounded-full px-5 py-2 font-display text-sm font-semibold tracking-wide sm:text-base",
                      filled
                        ? "bg-gold-500 text-ink-950 shadow-[0_10px_24px_-12px_rgba(200,164,92,0.85)]"
                        : "border border-gold-500/40 bg-white text-ink-800",
                    )}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
