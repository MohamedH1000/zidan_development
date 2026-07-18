# Testimonials & Reviews (with Review/AggregateRating schema)

## Why

The site already ships strong structured data (Organization, RealEstateAgent,
WebSite, FAQ, Article, Breadcrumb — see `lib/seo.ts`), but nothing that
generates a star-rating rich snippet in search results, and nothing on-page
that builds trust for a first-time visitor comparing developers. Real
testimonials (with schema markup) do both at once.

## What to add

- A `Testimonial` model (bilingual `_en`/`_ar` fields, following the existing
  `Project`/`Blog` convention) manageable from `/admin`, following the exact
  CRUD pattern already established for Projects/Units/Blogs.
- A testimonials section on the homepage + a dedicated `/testimonials` page
  (or fold into `/about`, decide based on content volume once seeded).
- `Review` + `AggregateRating` JSON-LD attached to the Organization schema in
  `lib/seo.ts`, following the existing `getOrganizationJsonLd()` pattern.

## Prompt

```
Add a testimonials/reviews feature to zidan_development, following the
existing Admin + DB architecture (Prisma → Supabase, NextAuth-protected
/admin CRUD) exactly as it's done for Blog and Project.

1. Read context/architecture.md's "Data Architecture" and "Admin" sections
   first — do not invent a different pattern.
2. Add a `Testimonial` model to prisma/schema.prisma: id, authorName,
   authorRole (optional, e.g. "Buyer, Al Andalus"), quoteEn, quoteAr, rating
   (1-5 int), relatedProjectId (optional FK), imageUrl (optional, Cloudinary,
   same upload pattern as Project images), isPublished bool, sortOrder,
   createdAt/updatedAt. Push with
   `npx prisma db push --url "$DIRECT_URL"` sourcing .env.local per the
   project's established Prisma-7-to-Supabase workflow — do not put URLs
   directly in schema.prisma (Prisma 7 forbids it).
3. Build admin CRUD at app/[locale]/(admin)/admin/(protected)/testimonials/
   (list/new/[id]/edit), copying the Blog or Project CRUD structure/patterns
   file-for-file, including bilingual EN/AR admin labels via messages/*.json.
4. Build a public TestimonialCard component (components/sections/) and a
   homepage section, only rendering isPublished rows ordered by sortOrder.
5. Add getTestimonialJsonLd() to lib/seo.ts producing schema.org Review nodes,
   and fold an AggregateRating into getOrganizationJsonLd() computed from the
   published testimonials' average rating — recompute at request time (or
   cache appropriately), don't hardcode a rating.
6. Only mark testimonials as real customer reviews if they ARE — Google's
   structured data policies prohibit fabricated or incentivized-without-
   disclosure reviews. Do not seed fake testimonial content; leave the table
   empty until the business provides real ones, and make sure the schema
   only renders once at least one published testimonial exists.
7. Update context/progress-tracker.md, context/architecture.md (new
   Testimonial entity), and context/ui-registry.md via /imprint.
```
