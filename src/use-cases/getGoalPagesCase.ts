import { GoalPageRepository } from "@/db-access/goalPageRepository";
import { AuthenticationError } from "@/entities/errors";

export async function getGoalPages(
  context: { goalPageRepo: GoalPageRepository },
  params: { userId: string; isAuthenticated: boolean }
) {
  const { goalPageRepo } = context;
  const { userId, isAuthenticated } = params;

  if (!isAuthenticated) {
    throw new AuthenticationError();
  }

  return goalPageRepo.getPagesByUserId(userId);
}
