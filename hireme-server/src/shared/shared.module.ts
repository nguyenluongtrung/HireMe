import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PrismaService } from './services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { SharedUserRepository } from './repositories/shared-user.repo'
import { AccessTokenGuard } from './guards/access-token.guard'
import { APP_GUARD } from '@nestjs/core'
import { AuthenticationGuard } from './guards/authentication.guard'


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
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
