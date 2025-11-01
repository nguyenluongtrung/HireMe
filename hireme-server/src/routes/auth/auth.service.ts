import { Injectable } from "@nestjs/common"

import { HashingService } from "src/shared/services/hashing.service"
import { TokenService } from "src/shared/services/token.service"
import { AccessTokenPayloadCreate } from "src/shared/types/jwt.type"
import { InvalidPasswordException, NotFoundRecordException } from "src/shared/error"
import { SharedRoleRepository } from "src/shared/repositories/shared-role.repo"
import { isUniqueConstraintPrismaError } from "src/shared/helpers"

import { LoginBodyType, RegisterBodyType } from "./auth.model"
import { AuthRepository } from "./auth.repo"
import { EmailAlreadyExistsException, EmailNotFoundException } from "./auth.error"

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly sharedRoleRepository: SharedRoleRepository,
  ) {}

  async login(body: LoginBodyType) {
    // 1. Get user info, check whether user is existed, having correct password and email
    const user = await this.authRepository.findUniqueUserIncludeRole({
      email: body.email,
    })

    if (!user) {
      throw EmailNotFoundException
    }
    const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    if (!isPasswordMatch) {
      throw InvalidPasswordException
    }

    // 2. Generate accessToken and refreshToken
    const tokens = await this.generateTokens({
      userId: user.id,
      roleId: user.roleId,
      roleName: user.role.name,
    })
    return tokens
  }

  async register(body: RegisterBodyType) {
    try {
      const clientRoleId = await this.sharedRoleRepository.getUserRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.authRepository.createUser({
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        roleId: clientRoleId,
      })
      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw EmailAlreadyExistsException
      }
      throw error
    }
  }

  async generateTokens({ userId, roleId, roleName }: AccessTokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({
        userId,
        roleId,
        roleName,
      }),
      this.tokenService.signRefreshToken({
        userId,
      }),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
    })
    return { accessToken, refreshToken }
  }

  async getMe(userId: number) {
    const user = await this.authRepository.findUniqueUserIncludeRole(
      {
        id: userId,
      },
      true,
    )
    if (!user) {
      throw NotFoundRecordException
    }
    return user
  }
}
