import { Injectable } from '@nestjs/common'
import { RoleName } from 'src/shared/constants/role.constant'
import { SerializeAll } from 'src/shared/constants/serialize.decorator'
import { RoleType } from 'src/shared/models/shared-role.model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
@SerializeAll()
export class SharedRoleRepository {
  private userRoleId: number | null = null
  private adminRoleId: number | null = null

  constructor(private readonly prismaService: PrismaService) {}

  private async getRole(roleName: string) {
    const role: RoleType = await this.prismaService.$queryRaw`
    SELECT * FROM "Role" WHERE name = ${roleName} AND "deletedAt" IS NULL LIMIT 1;
  `.then((res: RoleType[]) => {
      if (res.length === 0) {
        throw new Error('Role not found')
      }
      return res[0]
    })
    return role
  }

  async getUserRoleId() {
    if (this.userRoleId) {
      return this.userRoleId
    }
    const role = await this.getRole(RoleName.User)

    this.userRoleId = role.id
    return role.id
  }

  async getAdminRoleId() {
    if (this.adminRoleId) {
      return this.adminRoleId
    }
    const role = await this.getRole(RoleName.Admin)

    this.adminRoleId = role.id
    return role.id
  }
}
