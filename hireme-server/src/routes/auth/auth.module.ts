import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthRepository } from 'src/routes/auth/auth.repo'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { PrismaService } from 'src/shared/services/prisma.server'

@Module({
  providers: [AuthService, AuthRepository, HashingService, TokenService, JwtService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
