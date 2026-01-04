import { UnprocessableEntityException } from '@nestjs/common'

export const ApplicationAlreadyExistsException = new UnprocessableEntityException([
  {
    message: 'Error.ApplicationAlreadyExists',
    path: 'name',
  },
])

