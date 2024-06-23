interface DomainError extends Error {
  name: string;
}

export class AuthenticationError implements DomainError {
  message: "User is not authenticated";
  name: "AuthenticationError";
}

export class UserPageNumberExceeded implements DomainError {
  constructor(maxNumPages: number) {
    this.message = `User cannot exceed ${maxNumPages} pages for current plan.`;
  }

  name = "UserPageNumberExceeded";
  message: string;
}

export class InvalidPageName implements DomainError {
  name = "InvalidPageName";
  message = "Page name cannot be an empty string or exceed 125 characters.";
}
