import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { getGoalPageByIdCase } from "@/use-cases/getGoalPageByIdCase";
import { TursoGoalPageRepo } from "@/db-access/goalPageRepository";
import { auth } from "@/lib/auth/auth";
import { NextErrorController } from "@/controllers/errorController";

export const GET = auth(async function GET(
  req,
  ctx: { params: { goal_id: string } }
) {
  const { goal_id } = ctx.params;

  try {
    const page = await getGoalPageByIdCase(
      { goalPageRepo: new TursoGoalPageRepo() },
      { isAuthenticated: Boolean(req.auth) !== null, goal_id }
    );

    return NextResponse.json({ page }, { status: 200 });
  } catch (error) {
    return NextErrorController.handleError(error);
  }
});
