import { createZodDto } from "nestjs-zod"
import {
  CreateRoleBodySchema,
  CreateRoleResSchema,
  GetRoleDetailResSchema,
  GetRoleParamsSchema,
  UpdateRoleBodySchema,
} from "./role.model"

import { RoleSchema } from "src/shared/models/shared-role.model"
import { PaginationResSchema } from "src/shared/models/shared-pagination.model"

export class GetRolesResDTO extends createZodDto(PaginationResSchema(RoleSchema)) {}

export class GetRoleParamsDTO extends createZodDto(GetRoleParamsSchema) {}

export class GetRoleDetailResDTO extends createZodDto(GetRoleDetailResSchema) {}

export class CreateRoleBodyDTO extends createZodDto(CreateRoleBodySchema) {}

export class CreateRoleResDTO extends createZodDto(CreateRoleResSchema) {}

export class UpdateRoleBodyDTO extends createZodDto(UpdateRoleBodySchema) {}
