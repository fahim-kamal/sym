export type GoalPageEntity = {
  id: string;
  name: string;
  icon_url: string | null;
  banner_url: string | null;
  deadline: Date | null;
};

export type GoalPageId = Pick<GoalPageEntity, "id">;

export type GoalRole = "owner" | "collaborator";

export type UserGoalEntity = {
  user_id: string;
  goal_id: string;
  role: GoalRole;
};

export type UserGoalPage = Omit<GoalPageEntity, "id"> & UserGoalEntity;
