import { NextResponse } from "next/server";
import { DomainError } from "@/entities/errors";

interface ErrorController {
  handleError(err: DomainError): any;
}

function NextErrorControllerImpl(): ErrorController {
  return {
    handleError(err: DomainError) {
      return NextResponse.json(
        { message: err.name + ": " + err.message },
        { status: err.code }
      );
    },
  };
}

export const NextErrorController = NextErrorControllerImpl();
