import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'

import { AuthRepository } from 'src/routes/auth/auth.repo'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { SharedRoleRepository } from 'src/shared/repositories/shared-role.repo'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  providers: [AuthService, AuthRepository, HashingService, TokenService, JwtService, PrismaService, SharedRoleRepository],
  controllers: [AuthController],
})
export class AuthModule {}
