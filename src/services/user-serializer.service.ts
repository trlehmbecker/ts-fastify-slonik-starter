import { Serializer, JapiError } from "ts-japi"

export class UserNotFoundError extends JapiError {
  public constructor(message?: string) {
    super({
      status: 404,
      code: "UserNotFound",
      title: "User Not Found",
      detail: message,
    })
  }
}

export class UserNotCreatedError extends JapiError {
  public constructor(message?: string) {
    super({
      status: 400,
      code: "UserNotCreated",
      title: "User Not Created",
      detail: message,
    })
  }
}

export const userSerializer = new Serializer("users")
