import { createZodDto } from 'nestjs-zod'

import {
  LoginBodySchema,
  LoginResSchema,
  PublicUserSchema,
  RegisterBodySchema,
  UpdateMeBodySchema,
} from 'src/routes/auth/auth.model'

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}

export class LoginResDTO extends createZodDto(LoginResSchema) {}

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(PublicUserSchema) {}

export class GetMeResDTO extends createZodDto(PublicUserSchema) {}

export class UpdateMeBodyDTO extends createZodDto(UpdateMeBodySchema) {}

export class UpdateMeResDTO extends createZodDto(PublicUserSchema) {}