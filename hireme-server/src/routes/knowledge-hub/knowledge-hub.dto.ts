import { createZodDto } from "nestjs-zod"

import {
  GetKnowledgeItemsResSchema,
  UpsertKnowledgeItemBodySchema,
  KnowledgeItemSchema,
  GetKnowledgeItemsQuerySchema,
  UpsertKnowledgeResourceBodySchema,
  UpsertKnowledgeResourceResSchema,
  GetKnowledgeResourcesQuerySchema,
  GetKnowledgeResourcesResSchema,
  UpsertKnowledgeTagResSchema,
  UpsertKnowledgeTagBodySchema,
  GetKnowledgeTagsResSchema,
  GetKnowledgeTagsQuerySchema,
} from "./knowledge-hub.model"

export class GetKnowledgeItemsResDTO extends createZodDto(GetKnowledgeItemsResSchema) {}

export class GetKnowledgeResourcesResDTO extends createZodDto(GetKnowledgeResourcesResSchema) {}

export class GetKnowledgeItemsQueryDTO extends createZodDto(GetKnowledgeItemsQuerySchema) {}

export class GetKnowledgeResourcesQueryDTO extends createZodDto(GetKnowledgeResourcesQuerySchema) {}

export class GetKnowledgeItemDetailResDTO extends createZodDto(KnowledgeItemSchema) {}

export class GetKnowledgeTagsResDTO extends createZodDto(GetKnowledgeTagsResSchema) {}

export class GetKnowledgeTagsQueryDTO extends createZodDto(GetKnowledgeTagsQuerySchema) {}

export class UpsertKnowledgeItemResDTO extends createZodDto(UpsertKnowledgeItemBodySchema) {}

export class UpsertKnowledgeItemBodyDTO extends createZodDto(UpsertKnowledgeItemBodySchema) {}

export class UpsertKnowledgeResourceResDTO extends createZodDto(UpsertKnowledgeResourceResSchema) {}

export class UpsertKnowledgeResourceBodyDTO extends createZodDto(UpsertKnowledgeResourceBodySchema) {}

export class UpsertKnowledgeTagResDTO extends createZodDto(UpsertKnowledgeTagResSchema) {}

export class UpsertKnowledgeTagBodyDTO extends createZodDto(UpsertKnowledgeTagBodySchema) {}
