import { GoalPageRepository } from "@/db-access/goalPageRepository";
import { AuthenticationError, UserPageNumberExceeded } from "@/entities/errors";
import {
  GoalPageEntity,
  UserGoalEntity,
  UserGoalPage,
} from "@/entities/goalPage";

export async function createPageCase(
  context: {
    goalPageRepo: GoalPageRepository;
  },
  isAuthenticated: boolean,
  userGoal: Omit<UserGoalEntity, "goal_id">,
  page: GoalPageEntity
) {
  const { goalPageRepo } = context;

  if (!isAuthenticated) {
    throw new AuthenticationError();
  }

  const pages: Array<UserGoalPage> = await goalPageRepo.getPagesByUserId(
    userGoal.user_id
  );
  const maxNumberPages = 5;

  if (pages.length == maxNumberPages) {
    throw new UserPageNumberExceeded(maxNumberPages);
  }

  await goalPageRepo.addPage(userGoal, page);
}
