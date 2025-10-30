import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { IsPublic } from "src/shared/decorators/auth.decorator"
import { LoginBodyDTO, LoginResDTO } from "./auth.dto"
import { ZodSerializerDto } from "nestjs-zod"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @ZodSerializerDto(LoginResDTO)
  login(@Body() body: LoginBodyDTO) {
    return this.authService.login(body)
  }
}
