import { v4 as uuidv4 } from "uuid"
import { OAuth2Client } from "google-auth-library"
import { google } from "googleapis"

import { Injectable } from "@nestjs/common"

import { HashingService } from "src/shared/services/hashing.service"
import { SharedRoleRepository } from "src/shared/repositories/shared-role.repo"

import { AuthRepository } from "./auth.repo"
import { AuthService } from "./auth.service"
import { GoogleUserInfoError } from "./auth.error"

@Injectable()
export class GoogleService {
  private oauth2Client: OAuth2Client
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashingService: HashingService,
    private readonly sharedRoleRepository: SharedRoleRepository,
    private readonly authService: AuthService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
  }

  async loginWithGoogleIdToken(idToken: string) {
    // 1. Use idToken to verify
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload?.email) {
      throw GoogleUserInfoError
    }

    let user = await this.authRepository.findUniqueUserIncludeRole({
      email: payload.email,
    })
    // If no user, create one
    if (!user) {
      const clientRoleId = await this.sharedRoleRepository.getUserRoleId()
      const randomPassword = uuidv4()
      const hashedPassword = await this.hashingService.hash(randomPassword)
      user = await this.authRepository.createUserIncludeRole({
        email: payload.email,
        name: payload.name ?? "",
        password: hashedPassword,
        roleId: clientRoleId,
        phoneNumber: "",
        avatarUrl: payload.picture ?? null,
      })
    }
    const authTokens = await this.authService.generateTokens({
      userId: user.id,
      roleId: user.roleId,
      roleName: user.role.name,
    })
    return authTokens
  }
}
