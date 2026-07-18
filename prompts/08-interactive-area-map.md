# Interactive Areas Map

## Why

The site already has Leaflet + react-leaflet wired up for the admin
map-picker (`context/progress-tracker.md`, 2026-07-14 entry) and individual
project pages render a Google Maps embed once `mapLat`/`mapLng` are set. But
there's no single view letting a visitor see all 8 districts (`config/site.ts`
`areas`) at once and click through — which is exactly how most visitors
actually explore a multi-project developer's site (by geography, before they
know project names).

## What to add

A public interactive map on `/projects` (or a new `/projects/map` toggle
view) showing a pin per district with the projects located there, using the
same OpenStreetMap/Leaflet stack already in the codebase — no new mapping
vendor, no new API key.

## Prompt

```
Add a public interactive areas map to zidan_development's /projects page.

1. Read how the admin map-picker is implemented first (search for the
   Leaflet/react-leaflet usage introduced 2026-07-14 per
   context/progress-tracker.md) and reuse that setup rather than
   reintroducing Leaflet from scratch — same tile provider (OpenStreetMap),
   same lazy-loading approach (it's a client component; check whether it's
   dynamically imported with ssr:false, since Leaflet needs `window`).
2. Build components/sections/areas-map.tsx ("use client") rendering one
   marker per area in config/site.ts's `areas` array, using each project's
   real mapLat/mapLng from the DB (prisma.project.findMany) rather than
   guessing district-center coordinates — group multiple projects in the same
   area into a single marker with a popup listing them if they'd otherwise
   overlap.
3. Marker popup shows the area name (bilingual, getAreaName from
   config/site.ts) and links to /projects filtered by that area (check
   whether app/[locale]/(marketing)/projects/page.tsx already supports an
   area filter via searchParams — the existing ProjectsExplorer client
   component likely has this logic client-side already; wire the map's link
   to produce the same filtered state rather than inventing a new filter
   mechanism).
4. Add this as a view toggle (grid / map) on the existing /projects page
   rather than a separate route, so it doesn't fragment SEO equity or
   require a second generateMetadata — reuse the existing page's metadata.
5. Respect the CSP's frame-src / img-src rules in next.config.ts — confirm
   OpenStreetMap tile URLs are covered (img-src already allows https:, so
   raster tiles should be fine; verify no new host needs allow-listing).
6. Keep this progressively enhanced: if JS fails to load or on very old
   browsers, the existing grid view must still work — don't hide project
   cards behind the map.
7. Update context/progress-tracker.md and context/ui-registry.md (/imprint).
```
