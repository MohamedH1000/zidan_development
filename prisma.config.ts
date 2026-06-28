import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration. Connection URLs moved here from schema.prisma.
 *
 *  - url: runtime queries → Supabase TRANSACTION pooler (port 6543)
 *
 * For `prisma db push` (schema sync), override with `--url $DIRECT_URL` (the
 * session pooler, port 5432) so DDL runs on a non-pooled connection. Supabase
 * doesn't allow a separate shadow database, so we don't set `shadowDatabaseUrl`
 * (use `db push` rather than `migrate dev`).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
