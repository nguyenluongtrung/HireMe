import { Injectable } from "@nestjs/common"

import { SerializeAll } from "src/shared/constants/serialize.decorator"
import { RoleType } from "src/shared/models/shared-role.model"
import { UserType } from "src/shared/models/shared-user.model"
import { WhereUniqueUserType } from "src/shared/repositories/shared-user.repo"
import { PrismaService } from "src/shared/services/prisma.service"

@Injectable()
@SerializeAll()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(
    user: Pick<UserType, 'email' | 'name' | 'password' | 'roleId'>,
  ): Promise<Omit<UserType, 'password'>> {
    return this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
      },
    }) as any
  }

  findUniqueUserIncludeRole(where: WhereUniqueUserType, omitPassword: boolean = false): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        role: true,
      },
      omit: {
        password: omitPassword,
      },
    }) as Promise<(UserType & { role: RoleType }) | null>
  }

  createRefreshToken(data: { token: string; userId: number; expiresAt: Date }) {
    return this.prismaService.refreshToken.create({
      data,
    })
  }

  update(where: { id: number }, data: Partial<UserType>): Promise<UserType> {
    return this.prismaService.user.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
    }) as any
  }
}
