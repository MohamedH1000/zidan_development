# Downloadable Brochure — Gated Lead Capture

## Why

Right now the only lead-capture surfaces are the contact form and the
per-unit WhatsApp CTA. A gated PDF brochure download (email + phone in
exchange for a project brochure) is a standard, high-converting middle step
for visitors who aren't ready to fill out the full contact form or message on
WhatsApp yet, but want more detail than the on-page copy gives them.

## What to add

- A `brochureUrl` (Cloudinary-hosted PDF) field on the `Project` model,
  editable from the existing admin Project form.
- A "Download Brochure" CTA on the project detail page that opens a small
  modal/inline form (name + email + phone, Zod-validated, same pattern as
  contact/careers forms) — on submit, sends the lead through the existing
  `INotificationService` and returns the actual PDF URL (or triggers the
  download) only after successful submission.

## Prompt

```
Add a gated brochure-download feature to zidan_development's project detail
page (app/[locale]/(marketing)/projects/[slug]/page.tsx).

1. Add `brochureUrl String?` to the Project model in prisma/schema.prisma,
   push via `npx prisma db push --url "$DIRECT_URL"` (source .env.local for
   DIRECT_URL, per the project's established Prisma-7/Supabase workflow —
   never put connection URLs directly in schema.prisma).
2. Extend the existing admin Project create/edit form
   (app/[locale]/(admin)/admin/(protected)/projects/[id]/edit/page.tsx and
   the corresponding new/page.tsx) with a Cloudinary upload field for the
   brochure PDF, reusing whatever upload pattern is already used for
   project images/3D renders — check lib/ or app/actions/ for the existing
   Cloudinary upload action before writing a new one.
3. Add a new Zod schema in lib/validations/ (e.g. brochure-request.ts) —
   name, email, phone, honeypot field — following the exact pattern already
   used in lib/validations/contact.ts.
4. Add a Server Action (app/actions/brochure.ts) that validates the
   submission with Zod, sends it through the existing INotificationService
   (see lib/notifications/), and — only on success — returns the project's
   brochureUrl so the client can trigger the download (do not expose the URL
   to unauthenticated requests before validation passes).
5. Build a client form component (components/forms/brochure-request-form.tsx)
   using useActionState, following the existing ContactForm/CareersForm
   pattern (spinner-on-pending Button prop, bilingual via messages/*.json).
6. Only show the "Download Brochure" CTA on the project detail page when
   project.brochureUrl is set — don't render a dead button for projects
   without one yet.
7. Fire the analytics lead event from prompt 02 on successful submission.
8. Update context/progress-tracker.md and context/architecture.md.
```
