import { Injectable } from "@nestjs/common"

import { SerializeAll } from "src/shared/constants/serialize.decorator"
import { PrismaService } from "src/shared/services/prisma.service"

import {
  GetKnowledgeItemsQueryType,
  GetKnowledgeItemsResType,
  GetKnowledgeResourcesQueryType,
  GetKnowledgeResourcesResType,
  KnowledgeItem,
  KnowledgeResource,
  UpsertKnowledgeItemBodyType,
  UpsertKnowledgeResourceBodyType,
} from "./knowledge-hub.model"

@Injectable()
@SerializeAll()
export class KnowledgeHubRepo {
  constructor(private prismaService: PrismaService) {}

  async list(pagination: GetKnowledgeItemsQueryType): Promise<GetKnowledgeItemsResType> {
    const skip = (Number(pagination.page) - 1) * Number(pagination.limit)
    const take = Number(pagination.limit)
    const userId = Number(pagination.userId)
    const [totalItems, data] = await Promise.all([
      this.prismaService.knowledgeItem.count({ where: { deletedAt: null, userId } }),
      this.prismaService.knowledgeItem.findMany({
        where: { deletedAt: null, userId },
        skip,
        take,
        omit: {
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ])
    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  async listResource(pagination: GetKnowledgeResourcesQueryType): Promise<GetKnowledgeResourcesResType> {
    const skip = (Number(pagination.page) - 1) * Number(pagination.limit)
    const take = Number(pagination.limit)
    const userId = Number(pagination.userId)
    const [totalItems, data] = await Promise.all([
      this.prismaService.knowledgeResource.count({ where: { deletedAt: null, userId } }),
      this.prismaService.knowledgeResource.findMany({
        where: { deletedAt: null, userId },
        skip,
        take,
        select: {
          id: true,
          title: true,
          type: true,
          items: {
            where: {
              deletedAt: null,
            },
            select: {
              id: true,
              title: true,
              type: true,
              isFavorite: true,
              isArchived: true,
            },
          },
        },
      }),
    ])
    return {
      data,
      totalItems,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalItems / pagination.limit),
    }
  }

  findById(id: number) {
    return this.prismaService.knowledgeItem.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  create({ data }: { data: UpsertKnowledgeItemBodyType }): Promise<KnowledgeItem> {
    return this.prismaService.knowledgeItem.create({
      data,
    }) as any
  }

  createResource({ data }: { data: UpsertKnowledgeResourceBodyType }): Promise<KnowledgeResource> {
    return this.prismaService.knowledgeResource.create({
      data,
    }) as any
  }

  update({ id, data }: { id: number; data: UpsertKnowledgeItemBodyType }): Promise<KnowledgeItem> {
    return this.prismaService.knowledgeItem.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    }) as any
  }

  updateResource({ id, data }: { id: number; data: UpsertKnowledgeResourceBodyType }): Promise<KnowledgeResource> {
    return this.prismaService.knowledgeResource.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    }) as any
  }

  delete(id: number): Promise<KnowledgeItem> {
    return this.prismaService.knowledgeItem.delete({
      where: {
        id,
        deletedAt: null,
      },
    }) as any
  }

  deleteResource(id: number): Promise<KnowledgeResource> {
    return this.prismaService.knowledgeResource.delete({
      where: {
        id,
        deletedAt: null,
      },
    }) as any
  }
}
