# Global WhatsApp Click-to-Chat Widget

## Why

WhatsApp enquiry links already exist per-unit on project/unit detail pages
(`buildWhatsappHref` in `app/[locale]/(marketing)/projects/[slug]/page.tsx`),
but there's no persistent, site-wide way to start a WhatsApp conversation
from the homepage, blog, FAQs, or careers pages — exactly the pages where a
visitor decides whether to reach out at all. This is the single
highest-conversion, lowest-effort addition for this market (WhatsApp is the
dominant contact channel for Egyptian real estate).

## What to add

A small floating WhatsApp button, fixed bottom-corner (respecting RTL — it
should sit on the opposite side from the existing scroll-progress indicator
if one exists, check `components/layout/scroll-progress.tsx`), visible on
every marketing page, that opens `wa.me` with a generic (non-unit-specific)
pre-filled message.

## Prompt

```
Add a persistent WhatsApp click-to-chat button to zidan_development's
marketing layout (app/[locale]/(marketing)/layout.tsx).

1. Create components/layout/whatsapp-button.tsx ("use client" only if it
   needs motion/hover state — check whether a pure CSS :hover suffices
   first, per the project's server-vs-client rule in
   context/architecture.md).
2. Fixed position, bottom-4 end-4 (use logical `end` not `right` so it flips
   correctly under RTL), circular button with the WhatsApp glyph — check
   components/ui or lucide-react for an existing icon before adding a new
   SVG; if lucide doesn't have a brand WhatsApp icon, hand-write one as inline
   SVG per the project's existing pattern for brand glyphs
   (see components/visual/scene.tsx for the inline-SVG convention).
3. href = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent(...)}`
   — reuse the existing whatsAppNumber-cleaning logic from the unit CTA
   (`(process.env.WHATSAPP_PHONE_NUMBER || siteConfig.contact.phone).replace(/\D/g, "")`)
   rather than duplicating it inline; consider extracting it into
   lib/utils.ts as a shared `getWhatsappNumber()` helper since it'll now be
   used in at least two places.
4. Pre-filled message text goes in messages/{en,ar}.json (new
   `whatsappWidget.greeting` key) — locale-aware via useLocale(), not
   hardcoded English.
5. Hide it on admin routes ((admin) route group) and don't render it behind
   the CSP's frame-ancestors/object-src rules — it's just an <a> tag, should
   need no CSP changes.
6. Respect prefers-reduced-motion for any entrance animation, per the
   project's existing motion conventions in context/ui-rules.md.
7. Fire the analytics event from prompt 02 on click.
8. Update context/ui-registry.md (via /imprint) and
   context/progress-tracker.md.
```
