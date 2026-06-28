import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// A dummy hash compared on "user not found" so failed-login timing doesn't
// reveal whether an email exists.
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8eVjP3wW3W6eQ1aZ0YbZbQ1bZbQ1b";

/**
 * NextAuth (credentials) — validates an admin against the Prisma `AdminUser`
 * table (bcrypt). JWT session; role + active carried on the token. Disabled
 * (`active=false`) users cannot sign in. Successful login stamps `lastLoginAt`.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (!user) {
          await bcrypt.compare(password, DUMMY_HASH); // constant-time miss
          return null;
        }
        if (!user?.active) return null; // disabled account

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        // Stamp last login (best-effort, non-blocking for auth).
        prisma.adminUser
          .update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
          .catch(() => {});

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          active: user?.active,
        } as { id: string; email: string; name?: string; role: string; active: boolean };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; role?: string; active?: boolean };
        token.id = u.id;
        token.role = u.role ?? "ADMIN";
        token.active = u.active ?? true;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as { id?: string; role?: string; active?: boolean };
        u.id = token.id as string;
        u.role = (token.role as string) ?? "ADMIN";
        u.active = (token.active as boolean) ?? true;
      }
      return session;
    },
  },
};
