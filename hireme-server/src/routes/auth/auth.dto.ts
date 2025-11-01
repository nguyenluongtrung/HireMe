import { createZodDto } from 'nestjs-zod'

import {
  GetMeResSchema,
  LoginBodySchema,
  LoginResSchema,
  RegisterBodySchema,
  RegisterResSchema,
} from 'src/routes/auth/auth.model'

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}

export class LoginResDTO extends createZodDto(LoginResSchema) {}

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export class GetMeResDTO extends createZodDto(GetMeResSchema) {}