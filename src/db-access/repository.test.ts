import { beforeAll, afterAll, expect, test } from "vitest";
import { DatabaseAdapter } from "./databaseAdapter";
import { v4 as uuidv4 } from "uuid";
import { TursoGoalPageRepo } from "./goalPageRepository";
import { GoalPageEntity, UserGoalEntity } from "@/entities/goalPage";
import { tursoClient } from "@/lib/turso/tursoClient";

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

const runRepositoryTests = async () => {
  const tursoGoalPageRepo = new TursoGoalPageRepo();
  const client = new DatabaseAdapter(tursoClient);

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
    name: "test goal page",
    deadline: new Date(),
    icon_url: null,
    banner_url: null,
  };

  const userGoal: Omit<UserGoalEntity, "goal_id"> = {
    user_id: user.id,
    role: "owner",
  };

  test("GoalPage creation", async () => {
    const page = await tursoGoalPageRepo.addPage(userGoal, pageToAdd);
    expect(page).toBeDefined();
    expect(pageToAdd).toStrictEqual(page);
  });

  test("GoalPage query", async () => {
    const page = await tursoGoalPageRepo.getPageById(pageToAdd.id);
    expect(page).toBeDefined();
    expect(page).toStrictEqual(pageToAdd);
  });

  test("GoalPage by ID", async () => {
    const modifiedPage = { ...pageToAdd };
    const goal_id = modifiedPage.id;
    delete modifiedPage.id;
    const expected = [
      { ...modifiedPage, role: "owner", user_id: user.id, goal_id },
    ];
    const pages = await tursoGoalPageRepo.getPagesByUserId(user.id);
    expect(pages).toBeDefined();
    expect(pages).toStrictEqual(expected);
  });

  test("GoalPage update", async () => {
    const pageToBeUpdated = {
      goal_id: pageToAdd.id,
      user_id: user.id,
      deadline: new Date(),
      icon_url: "example.imageurl.com",
    };

    const pageMatch = {
      id: pageToAdd.id,
      name: pageToAdd.name,
      deadline: pageToBeUpdated.deadline,
      icon_url: pageToBeUpdated.icon_url,
      banner_url: pageToAdd.banner_url,
    };

    const updatedPage = await tursoGoalPageRepo.updatePage(pageToBeUpdated);
    expect(updatedPage).toBeDefined();
    expect(updatedPage).toStrictEqual(pageMatch);
  });

  test("GoalPage delete", async () => {
    const deletedId = await tursoGoalPageRepo.deletePageById(
      pageToAdd.id,
      user.id
    );
    expect(deletedId).toBeDefined();
    expect(deletedId).toEqual(pageToAdd.id);
  });
};

runRepositoryTests();
