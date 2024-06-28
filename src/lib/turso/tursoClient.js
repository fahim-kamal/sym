import { createClient } from "@libsql/client";

const options = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return { url: process.env.TURSO_DEV_DB };
    case "test":
      return { url: process.env.VITE_TURSO_DEV_DB };
    case "production": {
      return {
        url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
        authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
      };
    }
  }
})();

export const tursoClient = createClient(options);
