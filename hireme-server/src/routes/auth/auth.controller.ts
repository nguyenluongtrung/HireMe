import { Body, Controller, Post } from "@nestjs/common"
import { ZodResponse, ZodSerializerDto } from "nestjs-zod"

import { IsPublic } from "src/shared/decorators/auth.decorator"

import { AuthService } from "./auth.service"
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from "./auth.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @ZodResponse({ type: LoginResDTO })
  login(@Body() body: LoginBodyDTO) {
    return this.authService.login(body)
  }

  @Post('register')
  @IsPublic()
  @ZodResponse({type: RegisterResDTO})
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }
}
