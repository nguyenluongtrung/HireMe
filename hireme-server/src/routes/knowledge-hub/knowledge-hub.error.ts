import { UnprocessableEntityException } from '@nestjs/common'

export const KnowledgeItemAlreadyExistsException = new UnprocessableEntityException([
  {
    message: 'Error.KnowledgeItemAlreadyExists',
    path: 'name',
  },
])

