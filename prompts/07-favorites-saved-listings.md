# Saved / Favorite Listings

## Why

The site has no auth and no accounts by design (see "Features Out of Scope"
in `context/project-overview.md`) — so any "save for later" feature must work
without login. A localStorage-backed favorites list is a low-effort way to
give repeat visitors a reason to come back (a "My Shortlist" they can revisit
across sessions on the same device) without touching the auth boundary at
all.

## What to add

- A heart/bookmark toggle on `ProjectCard` and unit cards.
- Favorites persisted in `localStorage` (client-only, no DB, no account).
- A `/projects/shortlist` (or similar) page listing the visitor's saved
  projects/units, with an easy "share your shortlist via WhatsApp" CTA (turns
  a passive save into an active lead action).

## Prompt

```
Add a no-login-required "favorites/shortlist" feature to zidan_development.

1. Do NOT add authentication or a database table for this — the project
   explicitly keeps the public site auth-free (see context/project-overview.md
   "Features Out of Scope"). Use localStorage only.
2. Build a small client-side store: components/hooks/use-favorites.ts (or
   lib/ if it's not React-specific) wrapping localStorage reads/writes behind
   a typed hook (useFavorites() returning ids, toggle(id), isFavorite(id)) —
   guard all localStorage access with `typeof window !== "undefined"` checks
   since this is an App Router project with SSR.
3. Add a toggle button (heart icon, lucide-react) to
   components/sections/project-card.tsx and the unit cards on the project
   detail page — client component, motion-based fill animation is fine but
   must respect prefers-reduced-motion per context/ui-rules.md.
4. Add a new page app/[locale]/(marketing)/projects/shortlist/page.tsx (client
   component, since it reads localStorage) that resolves saved IDs against
   live DB data (getProjectsFromDB / prisma) so a stale localStorage ID for a
   deleted project doesn't crash — filter out ones that no longer resolve.
5. Add a "Share your shortlist" WhatsApp link that builds a message listing
   the saved project names (reuse the buildWhatsappHref pattern from the
   project detail page — consider extracting it to lib/utils.ts since it'll
   now have 3+ call sites, see prompt 04 which flags the same duplication).
6. This page should be noindex (buildMetadata({ noIndex: true, ... })) since
   its content is visitor-specific and has nothing for Google to index.
7. All strings in messages/{en,ar}.json, RTL-safe layout, existing Section/
   Container/Card primitives — no new layout patterns.
8. Update context/progress-tracker.md and, via /imprint,
   context/ui-registry.md.
```
