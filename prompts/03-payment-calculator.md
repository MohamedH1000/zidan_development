# Payment / Installment Calculator

## Why

Egyptian real-estate buyers shop primarily on payment plan terms (down
payment %, years to pay, monthly installment size), not just unit price —
every competitor developer site in this market has some form of installment
calculator. `content/projects` / the DB `Project`/`Unit` models already carry
`downPayment`, `installment`, and `delivery` fields (see
`app/[locale]/(marketing)/projects/[slug]/page.tsx`), so the raw data exists;
there's just no interactive tool built on top of it.

## What to add

An interactive calculator (client component) on the project/unit detail
pages: given a unit's total price (or a manually entered price if not in the
DB yet), down-payment %, and years, compute the monthly installment and show
a simple payment schedule. Bilingual, RTL-aware, no backend needed (pure
client-side math) — but log a lead-capture event (see prompt 02) when someone
uses it, since usage signals real purchase intent.

## Prompt

```
Add a payment/installment calculator to zidan_development's project and unit
detail pages (app/[locale]/(marketing)/projects/[slug]/page.tsx and
projects/[slug]/units/[unitSlug]/page.tsx).

1. Check the Prisma schema (prisma/schema.prisma) for whatever price field
   exists on Unit/Project today — if there's no numeric total price field yet,
   add one via a migration (bilingual not needed, it's a number) rather than
   parsing the existing free-text downPayment/installment strings.
2. Build a client component (components/sections/payment-calculator.tsx,
   "use client") with:
   - Inputs: total price (pre-filled from the unit/project if available,
     editable), down payment % (slider + number input), years to pay
     (select, e.g. 4/6/8/10 years — check what the business actually offers
     via the existing downPayment/installment copy before inventing terms).
   - Output: down payment amount, monthly installment, total paid over the
     term. Recompute live on input change (no submit button).
   - Uses the existing `formatNumber` from lib/utils.ts for EGP formatting,
     and `useLocale()` for RTL-aware layout — follow the existing Reveal/
     Section/Container primitives in components/ui, don't hand-roll new
     layout patterns.
3. All labels go in messages/{en,ar}.json under a new `paymentCalculator`
   namespace — no hardcoded English strings, per the project's own rule in
   context/architecture.md.
4. Fire the analytics lead event from prompt 02 once the user meaningfully
   interacts with the calculator (e.g. changes an input), not on mount.
5. Read context/ui-tokens.md and context/ui-rules.md before styling — no
   hardcoded hex values or raw Tailwind color classes, per AGENTS.md.
6. After building, run /imprint to capture the new component's patterns in
   context/ui-registry.md, and update context/progress-tracker.md.
```
