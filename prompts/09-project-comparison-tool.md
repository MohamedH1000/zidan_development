# Project / Unit Comparison Tool

## Why

A visitor deciding between two or three projects (or unit types within one
project) today has to hold specs in their head across page navigations. A
lightweight "compare" tray — pick up to 3 units/projects, see specs
side-by-side — keeps them on-site longer and surfaces the decision-driving
data (price band, delivery date, area, bedrooms) in one screen instead of
three.

## What to add

A "Compare" checkbox/button on project and unit cards that adds the item to
a small sticky comparison tray (client-side state, no DB needed — this is
session/localStorage state, not a persisted feature), plus a `/compare` view
rendering a side-by-side spec table.

## Prompt

```
Add a project/unit comparison tool to zidan_development.

1. This is client-side, ephemeral UI state — no new Prisma model. Reuse the
   localStorage pattern from prompt 07 (favorites) if that's already built,
   or build a small useCompare() hook the same way (max 3 items, guard SSR
   with typeof window checks).
2. Add a "Compare" toggle to components/sections/project-card.tsx and the
   unit cards on the project detail page (same call sites as prompt 07's
   favorite toggle — consider whether these two features should share one
   card-level "actions" slot rather than stacking two separate icon buttons
   awkwardly; look at the current ProjectCard layout before deciding).
3. Build a persistent-but-dismissible comparison tray (fixed bottom bar,
   shows thumbnails of selected items + a "Compare" button) that appears only
   when 2+ items are selected — client component, motion entrance respecting
   prefers-reduced-motion.
4. Build app/[locale]/(marketing)/projects/compare/page.tsx (client
   component) rendering a spec table: image, name, district, price/payment
   terms (downPayment/installment/delivery), area, bedrooms, bathrooms,
   status — pulling live data via the same getProjectBySlugFromDB /
   prisma.unit queries used elsewhere, not stale localStorage copies of the
   spec values (localStorage should only ever store IDs).
5. This page is noindex (visitor-specific, no unique content for Google) —
   use buildMetadata({ noIndex: true, ... }).
6. All strings bilingual via messages/{en,ar}.json; RTL-safe table layout
   (horizontal scroll on mobile, following the project's existing responsive
   table patterns in the admin CRUD lists if any exist).
7. Update context/progress-tracker.md and, via /imprint,
   context/ui-registry.md.
```
