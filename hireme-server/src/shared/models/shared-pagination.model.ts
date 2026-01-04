import z from "zod";

export const PaginationQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict()

export const PaginationResSchema = (schema: z.ZodType<any>) => z.object({
    data: z.array(schema),
    totalItems: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
})

export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>