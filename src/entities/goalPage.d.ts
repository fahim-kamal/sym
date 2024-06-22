export type GoalPageEntity = {
  id: string;
  name: string;
  icon_url: string | null;
  banner_url: string | null;
  deadline: Date | null;
};

export type GoalPageId = Pick<GoalPageEntity, "id">;
