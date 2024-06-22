import {
  GoalPageEntity,
  GoalPageId,
  UserGoalEntity,
} from "@/entities/goalPage";
import { DatabaseAdapter } from "./databaseAdapter";

export interface GoalPageRepository {
  addPage(
    userGoal: Omit<UserGoalEntity, "goal_id">,
    goalPage: GoalPageEntity
  ): Promise<GoalPageEntity>;
  getPageById(id: string): Promise<GoalPageEntity>;
  deletePageById(id: string): Promise<GoalPageId>;
  updatePage(
    goalPage: Partial<GoalPageEntity> & GoalPageId
  ): Promise<GoalPageEntity>;
}

export class TursoGoalPageRepo implements GoalPageRepository {
  private db: DatabaseAdapter;

  constructor(db: DatabaseAdapter) {
    this.db = db;
  }

  addPage(
    userGoal: Omit<UserGoalEntity, "goal_id">,
    goalPage: GoalPageEntity
  ): Promise<GoalPageEntity> {
    const _userGoal: UserGoalEntity = { ...userGoal, goal_id: goalPage.id };

    const goalPageEntity = this.db
      .batchAndReturnObjects([
        {
          sql: `
      INSERT INTO GoalPage 
      ${this.db.createInsertString(goalPage)} 
      RETURNING *
      `,
          args: goalPage,
        },
        {
          sql: `
      INSERT INTO UserGoal
      ${this.db.createInsertString(_userGoal)} 
        `,
          args: _userGoal,
        },
      ])
      .then((resArr) => resArr[0][0]);

    return goalPageEntity;
  }

  getPageById(id: string): Promise<GoalPageEntity> {
    const goalPageEntity = this.db.queryFirst({
      sql: `
      SELECT * FROM GoalPage
      WHERE id = ?  
      `,
      args: [id],
    });

    return goalPageEntity;
  }

  deletePageById(id: string): Promise<GoalPageId> {
    const deletedId = this.db
      .queryFirst({
        sql: `
      DELETE FROM GoalPage 
      WHERE id = ? 
      RETURNING id
      `,
        args: [id],
      })
      .then((res) => res.id);

    return deletedId;
  }

  updatePage(
    goalPage: Partial<GoalPageEntity> & GoalPageId
  ): Promise<GoalPageEntity> {
    const pageWithoutID: Partial<GoalPageEntity> = { ...goalPage };
    delete pageWithoutID.id;

    const updatedPage = this.db.queryFirst({
      sql: `
      UPDATE GoalPage 
      SET ${this.db.createUpdateString(pageWithoutID)}       
      WHERE id = :id 
      RETURNING * 
      `,
      args: goalPage,
    });

    return updatedPage;
  }
}
