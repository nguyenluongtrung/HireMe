import { Injectable } from '@nestjs/common'

import { SerializeAll } from 'src/shared/constants/serialize.decorator'
import { PaginationQueryType } from 'src/shared/models/shared-pagination.model'
import { PrismaService } from 'src/shared/services/prisma.service'

import { ApplicationType, GetApplicationsResType, UpsertApplicationBodyType } from './application.model'

@Injectable()
@SerializeAll()
export class ApplicationRepo {
  constructor(private prismaService: PrismaService) {}

  async list(pagination: PaginationQueryType): Promise<GetApplicationsResType>{
    const skip = (Number(pagination.page) - 1) * Number(pagination.limit)
    const take = Number(pagination.limit)
    const [totalItems, data] = await Promise.all([
      this.prismaService.application.count({
        where: {
          deletedAt: null
        }
      }),
      this.prismaService.application.findMany({
        where: {
          deletedAt: null
        },
        skip,
        take
      })
    ])
    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    } 
  }

  findById(id: number): Promise<ApplicationType>{
    return this.prismaService.application.findUnique({
      where: {
        id,
        deletedAt: null
      }
    }) as any
  }

  create({ data}: {data: UpsertApplicationBodyType}): Promise<ApplicationType>{
    console.log(data)
    return this.prismaService.application.create({
      data
    }) as any
  }

  update({ id, data }: { id: number; data: UpsertApplicationBodyType }): Promise<ApplicationType> {
    return this.prismaService.application.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    }) as any
  }

  delete({ id }: { id: number }): Promise<ApplicationType> {
    return this.prismaService.application.delete({
      where: {
        id,
        deletedAt: null,
      },
    }) as any
  }
}
