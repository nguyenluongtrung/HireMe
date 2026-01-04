import { createZodDto } from "nestjs-zod";

import { PaginationResSchema } from "src/shared/models/shared-pagination.model";

import { ApplicationSchema, GetApplicationParamsSchema, UpsertApplicationBodySchema, UpsertApplicationResSchema } from "./application.model";

export class GetApplicationsResDTO extends createZodDto(PaginationResSchema(ApplicationSchema)) {}

export class GetApplicationDetailResDTO extends createZodDto(ApplicationSchema) {}

export class GetApplicationParamsDTO extends createZodDto(GetApplicationParamsSchema) {}

export class UpsertApplicationResDTO extends createZodDto(UpsertApplicationResSchema) {}

export class UpsertApplicationBodyDTO extends createZodDto(UpsertApplicationBodySchema) {}