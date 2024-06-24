import { GoalPageRepository } from "@/db-access/goalPageRepository";
import { AuthenticationError } from "@/entities/errors";

export async function deletePageCase(
  context: { goalPageRepo: GoalPageRepository },
  params: { isAuthenticated: boolean; goal_id: string; user_id: string }
) {
  const { goalPageRepo } = context;
  const { isAuthenticated, goal_id, user_id } = params;

  if (!isAuthenticated || user_id === null) throw new AuthenticationError();

  return await goalPageRepo.deletePageById(goal_id, user_id);
}
