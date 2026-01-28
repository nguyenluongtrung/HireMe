import z from "zod"

import { KnowledgeItemType } from "src/shared/constants/knowledge-item.constant"
import { PaginationQuerySchema, PaginationResSchema } from "src/shared/models/shared-pagination.model"

// Tag schema
export const KnowledgeTagSchema = z.object({
  id: z.number(),
  name: z.string().max(100),
  knowledgeItemId: z.number(),
  createdAt: z.date(),
})

// Knowledge Resource (folder / file) schema
export const KnowledgeResourceSchema = z.object({
  id: z.number(),
  title: z.string().max(500),
  slug: z.string().max(600),
  type: z.enum([KnowledgeItemType.FOLDER, KnowledgeItemType.FILE]).default(KnowledgeItemType.FOLDER),
  order: z.number().default(0),
  userId: z.number(),
  deletedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Base Knowledge Item schema
export const KnowledgeItemSchema = KnowledgeResourceSchema.extend({
  content: z.string().optional(),
  parentId: z.number().optional(),
  isFavorite: z.boolean().default(false),
  isArchived: z.boolean().default(false),
})

export const GetKnowledgeItemsResSchema = PaginationResSchema(KnowledgeItemSchema)

export const GetKnowledgeItemsQuerySchema = PaginationQuerySchema.extend({
  userId: z.coerce.number().optional(),
})

export const UpsertKnowledgeItemBodySchema = KnowledgeItemSchema.omit({
  id: true,
}).strict()

export const UpsertKnowledgeItemResSchema = KnowledgeItemSchema.omit({
  id: true,
}).strict()

export const UpsertKnowledgeResourceBodySchema = KnowledgeResourceSchema.omit({
  id: true,
}).strict()

export const UpsertKnowledgeResourceResSchema = KnowledgeResourceSchema.omit({
  id: true,
}).strict()

// Type exports
export type KnowledgeTag = z.infer<typeof KnowledgeTagSchema>

export type KnowledgeItem = z.infer<typeof KnowledgeItemSchema>

export type KnowledgeResource = z.infer<typeof KnowledgeResourceSchema>

export type GetKnowledgeItemsResType = z.infer<typeof GetKnowledgeItemsResSchema>

export type GetKnowledgeItemsQueryType = z.infer<typeof GetKnowledgeItemsQuerySchema>

export type UpsertKnowledgeItemBodyType = z.infer<typeof UpsertKnowledgeItemBodySchema>

export type UpsertKnowledgeItemResType = z.infer<typeof UpsertKnowledgeItemResSchema>

export type UpsertKnowledgeResourceBodyType = z.infer<typeof UpsertKnowledgeResourceBodySchema>

export type UpsertKnowledgeResourceResType = z.infer<typeof UpsertKnowledgeResourceResSchema>
