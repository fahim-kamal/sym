export class AuthenticationError extends Error {
  constructor(message: string = "") {
    const defaultMessage = `User is not authenticated.`;
    super(message != "" ? message : defaultMessage);
    this.name = "AuthenticationError";
  }
}

export class UserPageNumberExceeded extends Error {
  constructor(maxNumPages: number) {
    super(`User cannot exceed ${maxNumPages} pages for current plan.`);
    this.name = "UserPageNumberExceeded";
  }
}
