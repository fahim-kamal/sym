import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

import { getGoalPageByIdCase } from "@/use-cases/getGoalPageByIdCase";
import { deletePageCase } from "@/use-cases/deletePageCase";
import { updatePageCase } from "@/use-cases/updatePageCase";

import { TursoGoalPageRepo } from "@/db-access/goalPageRepository";
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

export const DELETE = auth(async function DELETE(
  req,
  ctx: { params: { goal_id: string } }
) {
  const { goal_id } = ctx.params;
  const user_id = req.auth?.user.id;

  try {
    const deleted_id = await deletePageCase(
      { goalPageRepo: new TursoGoalPageRepo() },
      { isAuthenticated: Boolean(req.auth) !== null, goal_id, user_id }
    );

    const message =
      deleted_id !== undefined
        ? "Succesfully deleted " + goal_id
        : "Could not find " + goal_id;

    return NextResponse.json({ message }, { status: 200 });
  } catch (err) {
    return NextErrorController.handleError(err);
  }
});

export const PATCH = auth(async function PATCH(
  req,
  ctx: { params: { goal_id: string } }
) {
  const user_id = req.auth?.user.id;
  const goal_id = ctx.params.goal_id;

  const page: any = {
    user_id,
    goal_id,
  };

  const searchParams = req.nextUrl.searchParams;

  const fields = ["name", "deadline", "icon_url", "banner_url"];

  fields.forEach((field) => {
    if (searchParams.has(field)) {
      const val = searchParams.get(field);

      if (field === "deadline" && typeof val === "string") {
        page[field] = new Date(val);
      } else {
        page[field] = val;
      }
    }
  });

  try {
    const updatedPage = await updatePageCase(
      { goalPageRepo: new TursoGoalPageRepo() },
      { isAuthenticated: Boolean(req.auth) !== null, page }
    );

    return NextResponse.json(
      { message: "Updated page " + updatedPage.id, page: updatedPage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextErrorController.handleError(err);
  }
});
