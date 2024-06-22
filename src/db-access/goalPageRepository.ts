import { GoalPageEntity } from "@/entities/goalPage";
import { DatabaseAdapter } from "./databaseAdapter";

export interface GoalPageRepository {
  addPage(goalPage: GoalPageEntity): Promise<GoalPageEntity>;
  getPageById(id: string): Promise<GoalPageEntity>;
  deletePageById(id: string): void;
  updatePageById(id: string, newGoalPage: Partial<GoalPageEntity>): void;
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
  deletePageById(id: string): void {
    return;
  }
  updatePageById(id: string, newGoalPage: Partial<GoalPageEntity>): void {
    return;
  }
}
