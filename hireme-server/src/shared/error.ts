import { NotFoundException, UnprocessableEntityException } from "@nestjs/common"

export const NotFoundRecordException = new NotFoundException("Error.NotFound")

export const InvalidPasswordException = new UnprocessableEntityException([
  {
    message: "Error.InvalidPassword",
    path: "password",
  },
])

export const UserAlreadyExistsException = new UnprocessableEntityException([
  {
    message: "Error.UserAlreadyExists",
    path: "email",
  },
])
