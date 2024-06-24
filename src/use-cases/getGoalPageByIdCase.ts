import { GoalPageRepository } from "@/db-access/goalPageRepository";
import { AuthenticationError, InvalidPageError } from "@/entities/errors";

export async function getGoalPageByIdCase(
  context: { goalPageRepo: GoalPageRepository },
  params: { isAuthenticated: boolean; goal_id: string }
) {
  const { goalPageRepo } = context;
  const { isAuthenticated, goal_id } = params;

  if (!isAuthenticated) {
    throw new AuthenticationError();
  }

  const page = await goalPageRepo.getPageById(goal_id);

  if (page === undefined) {
    throw new InvalidPageError();
  }

  return page;
}
