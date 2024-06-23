import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { TursoAdapter } from "./tursoAdapter";
import { tursoClient } from "../turso/tursoClient";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  adapter: TursoAdapter(tursoClient),
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
