import z from "zod";

import { PaginationResSchema } from "src/shared/models/shared-pagination.model";

export const ApplicationSchema = z.object({
    id: z.number(),
    companyName: z.string().max(500),
    position: z.string().max(500),
    notes: z.string().max(500),
    userId: z.number(),
    status: z.enum(['PENDING', 'APPLIED', 'INTERVIEWED', 'ACCEPTED', 'REJECTED']),
    dateApplied: z.coerce.date(),
})

export const GetApplicationsResSchema = PaginationResSchema(ApplicationSchema)

export const GetApplicationParamsSchema = z.object({
    applicationId: z.coerce.number(),
}).strict()

export const UpsertApplicationBodySchema = ApplicationSchema.omit({
    id: true
}).strict()

export const UpsertApplicationResSchema = ApplicationSchema.omit({
    id: true
}).strict()

export type ApplicationType = z.infer<typeof ApplicationSchema> 

export type GetApplicationParamsType = z.infer<typeof GetApplicationParamsSchema>

export type UpsertApplicationResType = z.infer<typeof UpsertApplicationBodySchema>

export type UpsertApplicationBodyType = z.infer<typeof UpsertApplicationResSchema>

export type GetApplicationsResType = z.infer<typeof GetApplicationsResSchema>