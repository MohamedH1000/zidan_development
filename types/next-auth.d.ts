import type { DefaultSession } from "next-auth";

/** Augment NextAuth types so `session.user` carries id, role + active. */
declare module "next-auth" {
  interface Session {
    user: { id: string; role: string; active: boolean } & DefaultSession["user"];
  }
  interface User {
    role?: string;
    active?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    active?: boolean;
  }
}
