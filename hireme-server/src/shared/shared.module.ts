import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PrismaService } from './services/prisma.server'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { SharedUserRepository } from './repositories/shared-user.repo'


const sharedServices = [
  PrismaService,
  HashingService,
  TokenService,
  SharedUserRepository,
]

@Global()
@Module({
  providers: [
    ...sharedServices,
  ],
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
