import { GoalPageEntity } from "@/entities/goalPage";
import { DatabaseAdapter } from "./databaseAdapter";

export interface GoalPageRepository {
  addPage(userId: string, name: string): Promise<GoalPageEntity>;
  getPageById(id: string): Promise<GoalPageEntity>;
  deletePageById(id: string): void;
  updatePageById(id: string, newGoalPage: Partial<GoalPageEntity>): void;
}

export class TursoGoalPageRepo implements GoalPageRepository {
  db: DatabaseAdapter;

  constructor(db: DatabaseAdapter) {
    this.db = db;
  }

  addPage(userId: string, name: string): Promise<GoalPageEntity> {
    const goalPageEntity = this.db.queryFirst({
      sql: `
      INSERT INTO GoalPage (user_id, name) 
      VALUES (?, ?)
      RETURNING *
      `,
      args: [userId, name],
    });

    return goalPageEntity;
  }
  getPageById(id: string): GoalPageEntity {
    return;
  }
  deletePageById(id: string): void {
    return;
  }
  updatePageById(id: string, newGoalPage: Partial<GoalPageEntity>): void {
    return;
  }
}
