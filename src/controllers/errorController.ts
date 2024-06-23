import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import {
  AuthenticationError,
  UserPageNumberExceeded,
  InvalidPageName,
} from "@/entities/errors";

interface ErrorController {
  handleError(err: Error): any;
}

function NextErrorControllerImpl(): ErrorController {
  const getErrorCode = (err: Error) => {
    const errorCodeMap = {
      [AuthenticationError.name]: StatusCodes.UNAUTHORIZED,
      [UserPageNumberExceeded.name]: StatusCodes.UNPROCESSABLE_ENTITY,
      [InvalidPageName.name]: StatusCodes.UNPROCESSABLE_ENTITY,
    };

    return errorCodeMap[err.name] ?? StatusCodes.INTERNAL_SERVER_ERROR;
  };

  return {
    handleError(err: Error) {
      return NextResponse.json(
        { message: err.name + ": " + err.message },
        { status: getErrorCode(err) }
      );
    },
  };
}

export const NextErrorController = NextErrorControllerImpl();
