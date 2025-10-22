import { Injectable } from "@nestjs/common"

import { RoleType } from "src/shared/models/shared-role.model"
import { UserType } from "src/shared/models/shared-user.model"
import { WhereUniqueUserType } from "src/shared/repositories/shared-user.repo"
import { PrismaService } from "src/shared/services/prisma.server"

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueUserIncludeRole(where: WhereUniqueUserType): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        role: true,
      },
    })
  }

  createRefreshToken(data: { token: string; userId: number; expiresAt: Date }) {
    return this.prismaService.refreshToken.create({
      data,
    })
  }
}
