import { beforeAll, afterAll, expect, test } from "vitest";
import { createClient } from "@libsql/client";
import { DatabaseAdapter } from "./databaseAdapter";
import { v4 as uuidv4 } from "uuid";
import { TursoGoalPageRepo } from "./goalPageRepository";
import { GoalPageEntity } from "@/entities/goalPage";

const db = (client: DatabaseAdapter) => {
  return {
    page: async (userId: string, name: string): Promise<GoalPageEntity> => {
      return client.queryFirst({
        sql: `
        SELECT * FROM GoalPage
        WHERE user_id = ? and name = ?  
        `,
        args: [userId, name],
      });
    },
  };
};

const runRepositoryTests = async (client: DatabaseAdapter) => {
  const tursoGoalPageRepo = new TursoGoalPageRepo(client);
  const _db = db(client);

  const user = {
    id: uuidv4(),
    name: "TestUser",
    email: "test@test.com",
    emailVerified: null,
    image: null,
  };

  // create test user
  beforeAll(async () => {
    await client.queryFirst({
      sql: `
    INSERT INTO User (id, name, email, emailVerified, image)
    VALUES (:id, :name, :email, :emailVerified, :image) 
    `,
      args: user,
    });
  });

  // delete test user
  afterAll(async () => {
    await client.queryFirst({
      sql: `
      DELETE FROM User
      WHERE id = ?
      `,
      args: [user.id],
    });
  });

  const pageToAdd: GoalPageEntity = {
    id: uuidv4(),
    user_id: user.id,
    name: "test goal page",
    deadline: null,
    icon_url: null,
    banner_url: null,
  };

  test("GoalPage creation", async () => {
    const page = await tursoGoalPageRepo.addPage(pageToAdd);
    expect(page).toBeDefined();
    expect(pageToAdd).toStrictEqual(page);
  });

  test("GoalPage query", async () => {
    const page = await tursoGoalPageRepo.getPageById(pageToAdd.id);
    expect(page).toBeDefined();
    expect(page).toStrictEqual(pageToAdd);
  });
};

const client = new DatabaseAdapter(
  createClient({
    url: import.meta.env.VITE_NEXT_PUBLIC_TURSO_DATABASE_URL,
    authToken: import.meta.env.VITE_NEXT_PUBLIC_TURSO_AUTH_TOKEN,
  })
);

runRepositoryTests(client);
