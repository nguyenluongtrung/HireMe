import { createZodDto } from "nestjs-zod"

import {
  GetKnowledgeItemsResSchema,
  UpsertKnowledgeItemBodySchema,
  KnowledgeItemSchema,
  GetKnowledgeItemsQuerySchema,
  UpsertKnowledgeResourceBodySchema,
  UpsertKnowledgeResourceResSchema,
} from "./knowledge-hub.model"

export class GetKnowledgeItemsResDTO extends createZodDto(GetKnowledgeItemsResSchema) {}

export class GetKnowledgeItemsQueryDTO extends createZodDto(GetKnowledgeItemsQuerySchema) {}

export class GetKnowledgeItemDetailResDTO extends createZodDto(KnowledgeItemSchema) {}

export class UpsertKnowledgeItemResDTO extends createZodDto(UpsertKnowledgeItemBodySchema) {}

export class UpsertKnowledgeItemBodyDTO extends createZodDto(UpsertKnowledgeItemBodySchema) {}

export class UpsertKnowledgeResourceResDTO extends createZodDto(UpsertKnowledgeResourceResSchema) {}

export class UpsertKnowledgeResourceBodyDTO extends createZodDto(UpsertKnowledgeResourceBodySchema) {}
