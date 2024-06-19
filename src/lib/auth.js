import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { TursoAdapter } from "@/lib/tursoAdapter";
import { tursoClient } from "./tursoClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  adapter: TursoAdapter(tursoClient),
});
