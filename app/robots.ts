import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/en/admin/",
          "/ar/admin/",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

// Without a revalidate window this route is baked in at build time and only
// ever changes on a fresh deploy — refresh it hourly like the sitemap so a
// stale production robots.txt can't silently outlive a source-code fix.
export const revalidate = 3600;
