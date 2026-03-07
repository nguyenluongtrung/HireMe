import { UnprocessableEntityException } from "@nestjs/common"

export const KnowledgeItemAlreadyExistsException = new UnprocessableEntityException([
  {
    message: "Error.KnowledgeItemAlreadyExists",
    path: "name",
  },
])

export const KnowledgeResourceAlreadyExistsException = new UnprocessableEntityException([
  {
    message: "Error.KnowledgeResourceAlreadyExists",
    path: "name",
  },
])

export const KnowledgeTagAlreadyExistsException = new UnprocessableEntityException([
  {
    message: "Error.KnowledgeTagAlreadyExists",
    path: "name",
  },
])
