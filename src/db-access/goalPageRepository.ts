import { GoalPageEntity, GoalPageId } from "@/entities/goalPage";
import { Client } from "@libsql/client/.";

export abstract class GoalPageRepository {
  abstract addPage(userId: string, name: string): Promise<GoalPageId>;
  abstract getPageById(id: string): Promise<GoalPageEntity>;
  abstract deletePageById(id: string): void;
  abstract updatePageById(
    id: string,
    newGoalPage: Partial<GoalPageEntity>
  ): void;
}

export class TursoGoalPageRepo implements GoalPageRepository {
  db: Client;

  constructor(tursoDB: Client) {
    this.db = tursoDB;
  }

  addPage(userId: string, name: string): Promise<GoalPageId> {
    const goalPageId = this.db.execute({
      sql: `
      INSERT INTO GoalPage (id, name) 
      VALUES (?, ?)
      `,
      args: [userId, name],
    }).then(());

    return;
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
