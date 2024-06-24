import { createClient } from "@libsql/client";

export const tursoClient = createClient({
  url:
    process.env.NODE_ENV === "test"
      ? import.meta.env.VITE_NEXT_PUBLIC_TURSO_DATABASE_URL
      : process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
  authToken:
    process.env.NODE_ENV === "test"
      ? import.meta.env.VITE_NEXT_PUBLIC_TURSO_AUTH_TOKEN
      : process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
});
