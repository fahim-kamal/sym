import type {
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  Adapter,
  VerificationToken,
} from "@auth/core/adapters";

import type { Client, InStatement } from "@libsql/client";

import { v4 as uuidv4 } from "uuid";

import {
  transformISOToDate,
  transformToObjects,
  transformDateToISO,
  generateUpdatePlaceholders,
  createPlaceholderString,
} from "./tursoUtils";

export function TursoAdapter(turso: Client): Adapter {
  const query = async (stmt: InStatement) => {
    return turso
      .execute(stmt)
      .then(transformToObjects)
      .then(([res]) => res);
  };

  return {
    createUser: (user: AdapterUser) => {
      if (user?.emailVerified != null) {
        user = transformDateToISO(user, "emailVerified");
      }

      const createdUser = query({
        sql: `
        INSERT INTO User 
        ${createPlaceholderString(user)}
        RETURNING *
        `,
        args: user,
      });

      return createdUser;
    },
    getUser: (id: string) => {
      const user = query({
        sql: `
        SELECT * FROM User 
        WHERE id = ? 
        LIMIT 1
        `,
        args: [id],
      });

      return user;
    },
    getUserByEmail: (email: string) => {
      const user = query({
        sql: `
        SELECT * FROM User
        WHERE email = ? 
        LIMIT 1
        `,
        args: [email],
      });

      return user;
    },
    getUserByAccount: (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ) => {
      const userByAccount = query({
        sql: `
        SELECT User.id, name, email, emailVerified, image
        FROM Account 
        INNER JOIN User ON Account.userId = User.id
        WHERE provider = ? AND providerAccountId = ? 
        `,
        args: [providerAccountId.provider, providerAccountId.providerAccountId],
      });

      return userByAccount;
    },
    updateUser: (user: Partial<AdapterUser> & Pick<AdapterUser, "id">) => {
      const updateString = generateUpdatePlaceholders(user, ["id"]);

      if (user?.emailVerified) {
        user = transformDateToISO(user, "emailVerified");
      }

      const updatedUser = query({
        sql: `
        UPDATE User
        SET ${updateString}
        WHERE id = :id
        RETURNING *
        `,
        args: user,
      });

      return updatedUser;
    },
    linkAccount: (account: AdapterAccount) => {
      const accountArg = { ...account, id: uuidv4() };

      const linkedAccount = query({
        sql: `
        INSERT INTO Account
        ${createPlaceholderString(accountArg)} 
        RETURNING * 
        `,
        args: accountArg,
      });

      return linkedAccount;
    },
    createSession: (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }) => {
      const args = transformDateToISO({ ...session, id: uuidv4() }, "expires");

      const sessionRes = query({
        sql: `
        INSERT INTO Session 
        ${createPlaceholderString(args)}
        RETURNING *
        `,
        args,
      }).then((res) => transformISOToDate(res, "expires"));

      return sessionRes;
    },
    getSessionAndUser: (sessionToken: string) => {
      const sessionAndUser = query({
        sql: `
        SELECT 
          Session.id as s_id, 
          expires, 
          sessionToken,
          userId, 
          name,
          email,
          emailVerified, 
          image
        FROM Session
        INNER JOIN User ON Session.userId = User.id
        WHERE sessionToken = ?
        `,
        args: [sessionToken],
      }).then((res) => {
        if (res == null) return null;

        const withExpiresDate = transformISOToDate(res, "expires");

        const {
          expires,
          s_id,
          sessionToken,
          userId,
          name,
          email,
          emailVerified,
          image,
        } = withExpiresDate;

        const user = { id: userId, name, email, emailVerified, image };
        const session = { expires, id: s_id, sessionToken, userId };

        return { user, session };
      });

      return sessionAndUser;
    },
    updateSession: (
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ) => {
      const updateString = generateUpdatePlaceholders(session, [
        "sessionToken",
      ]);

      if (session?.expires) {
        session = transformDateToISO(session, "expires");
      }

      const updatedSession = query({
        sql: `
        UPDATE Session 
        SET ${updateString}
        WHERE sessionToken = :sessionToken
        RETURNING *
        `,
        args: session,
      }).then((res) => {
        if (res == null) return null;

        return transformISOToDate(res, "expires");
      });

      return updatedSession;
    },
    deleteSession: (sessionToken: string) => {
      const deletedSession = query({
        sql: `
        DELETE FROM Session 
        WHERE sessionToken = ? 
        RETURNING *
        `,
        args: [sessionToken],
      });

      return deletedSession;
    },
    createVerificationToken: (verificationToken: VerificationToken) => {
      const tokenArg = transformDateToISO(verificationToken, "expires");

      const token = query({
        sql: `
        INSERT INTO VerificationToken
        ${createPlaceholderString(tokenArg)}
        RETURNING *
        `,
        args: tokenArg,
      });

      return token;
    },
    useVerificationToken: (params: { identifier: string; token: string }) => {
      const usedToken = query({
        sql: `
        DELETE FROM VerificationToken
        WHERE identifier = ? AND token = ? 
        RETURNING *
        `,
        args: [params.identifier, params.token],
      });

      return usedToken;
    },
    unlinkAccount: (
      providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ) => {
      const unlinkedAccount = query({
        sql: `
        DELETE FROM Account
        WHERE provider = ? AND providerAccountId = ?
        RETURNING *
        `,
        args: [providerAccountId.provider, providerAccountId.providerAccountId],
      });

      return unlinkedAccount;
    },
    deleteUser: (userId: string) => {
      const deletedUser = query({
        sql: `
        DELETE FROM User
        WHERE id = ?
        RETURNING *
        `,
        args: [userId],
      });

      return deletedUser;
    },
  };
}
