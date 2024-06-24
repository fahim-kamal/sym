import { StatusCodes } from "http-status-codes";

export interface DomainError extends Error {
  code: number;
}

export class AuthenticationError implements DomainError {
  name = "AuthenticationError";
  message = "User is not authenticated.";
  code = StatusCodes.UNAUTHORIZED;
}

export class UserPageNumberExceeded implements DomainError {
  constructor(maxNumberPages: number) {
    this.message = `User cannot exceed ${maxNumberPages} pages for current plan.`;
  }
  name = "UserPageNumberExceeded";
  message: string;
  code = StatusCodes.UNPROCESSABLE_ENTITY;
}

export class InvalidPageName implements DomainError {
  name = "InvalidPageName";
  message = "Page cannot be an empty string or exceed 125 characters.";
  code = StatusCodes.UNPROCESSABLE_ENTITY;
}

export class InvalidPageError implements DomainError {
  name = "InvalidPageError";
  message = "Page cannot be found.";
  code = StatusCodes.NOT_FOUND;
}
