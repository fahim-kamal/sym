export type GoalPageEntity = {
  id: string;
  name: string;
  icon_url: string;
  banner_url: string;
  deadline: Date;
};

export type GoalPageId = Pick<GoalPageEntity, "id">;
