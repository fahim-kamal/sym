import { GoalPageRepository } from "@/db-access/goalPageRepository";
import {
  AuthenticationError,
  InvalidPageName,
  UserPageNumberExceeded,
} from "@/entities/errors";
import {
  GoalPageEntity,
  UserGoalEntity,
  UserGoalPage,
} from "@/entities/goalPage";

/**
 * Use case to create a goal page
 * @param context
 * @param isAuthenticated
 * @param userGoal
 * @param page
 */
export async function createPageCase(
  context: {
    goalPageRepo: GoalPageRepository;
  },
  params: {
    isAuthenticated: boolean;
    userGoal: Omit<UserGoalEntity, "goal_id">;
    page: GoalPageEntity;
  }
) {
  const { goalPageRepo } = context;
  const { isAuthenticated, userGoal, page } = params;
  const maxNameLength = 125;

  if (!isAuthenticated) {
    throw new AuthenticationError();
  }

  if (page.name == "" || page.name.length >= maxNameLength) {
    throw new InvalidPageName();
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
