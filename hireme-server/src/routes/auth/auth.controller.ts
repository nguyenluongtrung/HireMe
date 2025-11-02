import { Body, Controller, Get, HttpCode, Patch, Post } from "@nestjs/common"
import { ZodResponse } from "nestjs-zod"

import { Auth, IsPublic } from "src/shared/decorators/auth.decorator"
import { ActiveUser } from "src/shared/decorators/active-user.decorator"
import { AuthType } from "src/shared/constants/auth.constant"

import { AuthService } from "./auth.service"
import { GetMeResDTO, LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO, UpdateMeBodyDTO, UpdateMeResDTO } from "./auth.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
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

  @Auth([AuthType.Bearer])
  @Get('me')
  @ZodResponse({type: GetMeResDTO})
  getMe(@ActiveUser('userId') userId: number) {
    return this.authService.getMe(userId)
  }

  @Patch('me')
  @Auth([AuthType.Bearer])
  // @ZodResponse({type: UpdateMeResDTO})
  updateMe(@ActiveUser('userId') userId: number, @Body() body: UpdateMeBodyDTO) {
    return this.authService.updateMe(body, userId)
  }
}
