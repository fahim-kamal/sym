import { GoalPageEntity } from "./goalPage";

export type User = {
  id: string;
  name: string;
  email: string;
  pages: Array<GoalPageEntity>;
};
