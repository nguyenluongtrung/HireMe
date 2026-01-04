import { createZodDto } from "nestjs-zod";

import { PaginationQuerySchema } from "../models/shared-pagination.model";

export class PaginationQueryDTO extends createZodDto(PaginationQuerySchema) {}