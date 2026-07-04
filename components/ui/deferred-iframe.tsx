"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Poster = {
  src: string;
  alt: string;
  sizes: string;
};

export function DeferredIframe({
  src,
  title,
  buttonLabel,
  fallbackHref,
  poster,
  children,
  className,
  iframeClassName,
  allow,
  allowFullScreen = false,
  referrerPolicy,
}: {
  src: string;
  title: string;
  buttonLabel: string;
  fallbackHref?: string;
  poster?: Poster;
  children?: React.ReactNode;
  className?: string;
  iframeClassName?: string;
  allow?: string;
  allowFullScreen?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loaded ? (
        <iframe
          className={cn("absolute inset-0 h-full w-full border-0", iframeClassName)}
          src={src}
          title={title}
          loading="lazy"
          allow={allow}
          referrerPolicy={referrerPolicy}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <div className="absolute inset-0 bg-ink-950">
          {poster ? (
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              sizes={poster.sizes}
              className="object-cover opacity-70"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/40 to-ink-950/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            {children}
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold-500 px-6 text-sm font-semibold text-ink-950 shadow-[0_18px_45px_-22px_rgba(200,164,92,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
              onClick={() => setLoaded(true)}
            >
              {buttonLabel}
            </button>
            {fallbackHref ? (
              <noscript>
                <a href={fallbackHref}>{buttonLabel}</a>
              </noscript>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
