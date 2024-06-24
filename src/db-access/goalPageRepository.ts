import {
  GoalPageEntity,
  GoalPageId,
  UserGoalEntity,
  UserGoalPage,
} from "@/entities/goalPage";
import { DatabaseAdapter } from "./databaseAdapter";
import { tursoClient } from "@/lib/turso/tursoClient";

export interface GoalPageRepository {
  addPage(
    userGoal: Omit<UserGoalEntity, "goal_id">,
    goalPage: GoalPageEntity
  ): Promise<GoalPageEntity>;
  getPageById(id: string): Promise<GoalPageEntity>;
  getPagesByUserId(userId: string): Promise<Array<UserGoalPage>>;
  deletePageById(id: string, userId: string): Promise<GoalPageId>;
  updatePage(
    goalPage: Partial<GoalPageEntity> & GoalPageId
  ): Promise<GoalPageEntity>;
}

export class TursoGoalPageRepo implements GoalPageRepository {
  private db: DatabaseAdapter;

  constructor() {
    this.db = new DatabaseAdapter(tursoClient);
  }

  addPage(
    userGoal: Omit<UserGoalEntity, "goal_id">,
    goalPage: GoalPageEntity
  ): Promise<GoalPageEntity> {
    const _userGoal: UserGoalEntity = { ...userGoal, goal_id: goalPage.id };
    const _goalPage = this.dateStringNormalizer(goalPage);

    const goalPageEntity = this.db
      .batchAndReturnObjects([
        {
          sql: `
      INSERT INTO GoalPage 
      ${this.db.createInsertString(_goalPage)} 
      RETURNING *
      `,
          args: _goalPage,
        },
        {
          sql: `
      INSERT INTO UserGoal
      ${this.db.createInsertString(_userGoal)} 
        `,
          args: _userGoal,
        },
      ])
      .then((resArr) => this.normalizeResponse(resArr[0][0]));

    return goalPageEntity;
  }

  getPageById(id: string): Promise<GoalPageEntity> {
    const goalPageEntity = this.db
      .queryFirst({
        sql: `
      SELECT * FROM GoalPage
      WHERE id = ?  
      `,
        args: [id],
      })
      .then(this.normalizeResponse);

    return goalPageEntity;
  }

  getPagesByUserId(userId: string): Promise<Array<UserGoalPage>> {
    const pages = this.db
      .queryMany({
        sql: `
      SELECT * 
      FROM UserGoal 
      INNER JOIN GoalPage
      ON GoalPage.id = UserGoal.goal_id      
      WHERE user_id = ? 
      `,
        args: [userId],
      })
      .then((pages) =>
        pages.map((page) => {
          const withoutIdField = { ...page };
          delete withoutIdField.id;

          return this.normalizeResponse(withoutIdField);
        })
      );

    return pages;
  }

  deletePageById(id: string, userId: string): Promise<GoalPageId> {
    const deletedId = this.db
      .queryFirst({
        sql: `
      DELETE FROM GoalPage
      WHERE id IN (
        SELECT id FROM GoalPage
        INNER JOIN UserGoal
          ON GoalPage.id = UserGoal.goal_id
        WHERE goal_id = ? AND user_id = ? AND role = "owner"
      )
      RETURNING id
      `,
        args: [id, userId],
      })
      .then((res) => res?.id);

    return deletedId;
  }

  updatePage(
    goalPage: Partial<GoalPageEntity> & GoalPageId
  ): Promise<GoalPageEntity> {
    const pageWithoutID: any = {
      ...goalPage,
    };
    delete pageWithoutID.id;

    const modified = this.dateStringNormalizer(goalPage);

    const updatedPage = this.db
      .queryFirst({
        sql: `
      UPDATE GoalPage 
      SET ${this.db.createUpdateString(pageWithoutID)}       
      WHERE id = :id 
      RETURNING * 
      `,
        args: modified,
      })
      .then(this.normalizeResponse);

    return updatedPage;
  }

  private dateStringNormalizer(object: any) {
    const modified = { ...object };
    if (modified?.deadline && typeof modified.deadline !== null) {
      const deadline: Date = modified.deadline;
      modified.deadline = deadline.toISOString();
    }
    return modified;
  }

  private normalizeResponse(res: any) {
    if (res === undefined) return;

    return {
      ...res,
      deadline:
        typeof res.deadline === "string" ? new Date(res.deadline) : null,
    };
  }
}
