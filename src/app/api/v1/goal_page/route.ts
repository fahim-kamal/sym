import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

import { createPageCase } from "@/use-cases/createPageCase";
import { TursoGoalPageRepo } from "@/db-access/goalPageRepository";
import { GoalPageEntity, UserGoalEntity } from "@/entities/goalPage";
import { v4 as uuidv4 } from "uuid";

import { NextErrorController } from "@/controllers/errorController";

export async function GET(request: NextRequest) {
  const res = { status: "route is not completed yet" };
  return Response.json(res);
}

export const POST = auth(async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  const userGoal: Omit<UserGoalEntity, "goal_id"> = {
    user_id: request.auth?.user.id,
    role: "owner",
  };

  const page: GoalPageEntity = {
    id: uuidv4(),
    name: name,
    icon_url: null,
    banner_url: null,
    deadline: null,
  };

  try {
    await createPageCase(
      { goalPageRepo: new TursoGoalPageRepo() },
      {
        isAuthenticated: Boolean(request.auth) !== false,
        userGoal: userGoal,
        page: page,
      }
    );
  } catch (error) {
    return NextErrorController.handleError(error);
  }

  return NextResponse.json(
    { message: "Page created for goal: " + name },
    { status: 201 }
  );
});
