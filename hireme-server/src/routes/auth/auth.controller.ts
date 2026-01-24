import { Body, Controller, Get, HttpCode, Patch, Post, Query, Res } from "@nestjs/common"
import { ZodResponse } from "nestjs-zod"
import { Response } from "express"

import { Auth, IsPublic } from "src/shared/decorators/auth.decorator"
import { ActiveUser } from "src/shared/decorators/active-user.decorator"
import { AuthType } from "src/shared/constants/auth.constant"
import envConfig from "src/shared/config"

import { AuthService } from "./auth.service"
import { GoogleService } from "./google.service"
import {
  GetAuthorizationUrlResDTO,
  GetMeResDTO,
  LoginBodyDTO,
  LoginResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
  UpdateMeBodyDTO,
} from "./auth.dto"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post("login")
  @HttpCode(200)
  @IsPublic()
  @ZodResponse({ type: LoginResDTO })
  login(@Body() body: LoginBodyDTO) {
    return this.authService.login(body)
  }

  @Post("register")
  @IsPublic()
  @ZodResponse({ type: RegisterResDTO })
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }

  @Auth([AuthType.Bearer])
  @Get("me")
  @ZodResponse({ type: GetMeResDTO })
  getMe(@ActiveUser("userId") userId: number) {
    return this.authService.getMe(userId)
  }

  @Patch("me")
  @Auth([AuthType.Bearer])
  // @ZodResponse({type: UpdateMeResDTO})
  updateMe(@ActiveUser("userId") userId: number, @Body() body: UpdateMeBodyDTO) {
    return this.authService.updateMe(body, userId)
  }

  @Get("google-link")
  @IsPublic()
  @ZodResponse({ type: GetAuthorizationUrlResDTO })
  getAuthorizationUrl() {
    return this.googleService.getAuthorizationUrl()
  }

  @Get("google/callback")
  @IsPublic()
  async googleCallback(@Query("code") code: string, @Res() res: Response) {
    try {
      const data = await this.googleService.googleCallback({
        code,
      })
      return res.redirect(
        `${envConfig.GOOGLE_CLIENT_REDIRECT_URI}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`,
      )
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi đăng nhập bằng Google, vui lòng thử lại bằng cách khác"
      return res.redirect(`${envConfig.GOOGLE_CLIENT_REDIRECT_URI}?errorMessage=${message}`)
    }
  }
}
