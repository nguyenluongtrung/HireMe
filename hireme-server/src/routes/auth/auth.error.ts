import { UnprocessableEntityException } from "@nestjs/common"

export const EmailNotFoundException = new UnprocessableEntityException([
  {
    message: "Error.EmailNotFound",
    path: "email",
  },
])
