import { GoalPageRepository } from "@/db-access/goalPageRepository";
import { AuthenticationError } from "@/entities/errors";
import { GoalPageEntity } from "@/entities/goalPage";

export async function updatePageCase(
  context: { goalPageRepo: GoalPageRepository },
  params: {
    isAuthenticated: boolean;
    page: Partial<Omit<GoalPageEntity, "id">> & {
      goal_id: string;
      user_id: string;
    };
  }
) {
  const { goalPageRepo } = context;
  const { isAuthenticated, page } = params;

  if (!isAuthenticated) {
    throw new AuthenticationError();
  }

  return await goalPageRepo.updatePage(page);
}
