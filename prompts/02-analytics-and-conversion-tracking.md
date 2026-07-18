# Analytics & Conversion Tracking

## Why

There is currently no analytics wired into the site — no way to know which
projects get the most views, where visitors drop off, or which channel
(organic, WhatsApp, direct) actually produces contact-form and careers
submissions. Every other recommendation in this `prompts/` folder is
unmeasurable without this landing first.

## What to add

- **Vercel Analytics + Speed Insights** (`@vercel/analytics`,
  `@vercel/speed-insights`) — zero-config Core Web Vitals + page view data
  since the site is already on Vercel.
- **GA4** via `next/script` with `strategy="afterInteractive"`, gated behind
  a cookie-consent check (see privacy page — Egypt has no strict GDPR
  equivalent, but keep this honest given the existing `/privacy` policy).
- **Conversion events**: fire a GA4 event (and optionally a Meta Pixel
  `Lead` event) on successful contact-form submission, careers submission,
  and WhatsApp CTA clicks (project/unit enquiry buttons already exist in
  `components/sections` and the project/unit detail pages).

## Prompt

```
Add analytics and conversion tracking to zidan_development (Next.js 16 App
Router, bilingual EN/AR, no existing analytics).

1. Install and wire @vercel/analytics and @vercel/speed-insights in
   app/[locale]/layout.tsx (they're React components dropped near the closing
   </body>, check current Next/Vercel docs syntax via
   node_modules/next/dist/docs first, since this app targets bleeding-edge
   Next 16).
2. Add GA4 via next/script, reading the measurement ID from
   NEXT_PUBLIC_GA_MEASUREMENT_ID (document it in .env.local.example if one
   exists, or note it needs to be added to Vercel env vars).
3. Create a small client-side analytics helper (e.g. lib/analytics.ts) that
   wraps `window.gtag` calls behind a typed function so components don't call
   gtag directly, and fails silently if GA hasn't loaded.
4. Fire a "generate_lead" event from:
   - submitContact / submitCareers server actions' success path (the client
     component wrapping useActionState should fire the event after a
     successful state, not the server action itself, since gtag is
     client-only).
   - The WhatsApp enquiry links on project/unit detail pages (buildWhatsappHref
     call sites in app/[locale]/(marketing)/projects/[slug]/page.tsx and its
     units/[unitSlug]/page.tsx).
5. Respect the CSP in next.config.ts — you will need to add
   https://www.googletagmanager.com and https://www.google-analytics.com to
   script-src and connect-src, and consider whether this needs a nonce given
   'unsafe-inline' is already allowed.
6. Do not block rendering or hurt LCP — analytics scripts must be
   non-render-blocking (afterInteractive strategy, no synchronous script
   tags in <head>).
7. Update context/progress-tracker.md and context/architecture.md (new
   "Analytics" system-boundary entry) when done.
```
