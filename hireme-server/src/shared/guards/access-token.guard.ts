import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { keyBy } from 'lodash'
import {
  REQUEST_ROLE_PERMISSIONS,
  REQUEST_USER_KEY,
} from 'src/shared/constants/auth.constant'
import { HTTPMethod } from 'src/shared/constants/role.constant'
import { RolePermissionsType } from 'src/shared/models/shared-role.model'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'
import { AccessTokenPayload } from 'src/shared/types/jwt.type'

type Permission = RolePermissionsType['permissions'][number]

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // 1. Extract & validate token
    const decodedAccessToken = await this.extractAndValidateToken(request)

    // 2. TODO: Validate user permissions

    return true
  }

  private async extractAndValidateToken(request: any): Promise<AccessTokenPayload> {
    const accessToken = this.extractAccessTokenFromHeader(request)
    try {
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken)
      request[REQUEST_USER_KEY] = decodedAccessToken
      return decodedAccessToken
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken')
    }
  }

  private extractAccessTokenFromHeader(request: any): string {
    const accessToken = request.headers.authorization?.split(' ')[1]
    if (!accessToken) {
      throw new UnauthorizedException('Error.MissingAccessToken')
    }
    return accessToken
  }

  private async validateUserPermission(
    decodedAccessToken: AccessTokenPayload,
    request: any,
  ): Promise<void> {
    const roleId: number = decodedAccessToken.roleId
    const path: string = request.route.path
    const method = request.method as keyof typeof HTTPMethod

    // Fetch role & permissions from DB
    const role = (await this.prismaService.role
      .findUniqueOrThrow({
        where: {
          id: roleId,
          deletedAt: null,
          isActive: true,
        },
        include: {
          permissions: {
            where: {
              deletedAt: null,
            },
          },
        },
      })
      .catch(() => {
        throw new ForbiddenException()
      })) as unknown as RolePermissionsType

    // Transform permissions into a key-value object for quick lookup
    const permissionObject = keyBy(
      role.permissions,
      (permission) => `${permission.path}:${permission.method}`,
    )

    request[REQUEST_ROLE_PERMISSIONS] = role

    // Check access
    const canAccess: Permission | undefined = permissionObject[`${path}:${method}`]
    if (!canAccess) {
      throw new ForbiddenException()
    }
  }
}
