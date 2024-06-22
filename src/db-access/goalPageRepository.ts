import { GoalPageEntity, GoalPageId } from "@/entities/goalPage";
import { DatabaseAdapter } from "./databaseAdapter";

export interface GoalPageRepository {
  addPage(goalPage: GoalPageEntity): Promise<GoalPageEntity>;
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

  addPage(goalPage: GoalPageEntity): Promise<GoalPageEntity> {
    const goalPageEntity = this.db.queryFirst({
      sql: `
      INSERT INTO GoalPage 
      ${this.db.createInsertString(goalPage)} 
      RETURNING *
      `,
      args: goalPage,
    });

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
