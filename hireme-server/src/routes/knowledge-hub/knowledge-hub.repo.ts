import { Injectable } from "@nestjs/common"

import { SerializeAll } from "src/shared/constants/serialize.decorator"
import { PrismaService } from "src/shared/services/prisma.service"

import {
  GetKnowledgeItemsQueryType,
  GetKnowledgeItemsResType,
  GetKnowledgeResourcesQueryType,
  GetKnowledgeResourcesResType,
  GetKnowledgeTagsQueryType,
  GetKnowledgeTagsResType,
  KnowledgeItem,
  KnowledgeResource,
  UpsertKnowledgeItemBodyType,
  UpsertKnowledgeResourceBodyType,
  UpsertKnowledgeTagBodyType,
} from "./knowledge-hub.model"
import { KnowledgeTag } from "generated/prisma"

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
    const title = pagination.title
    const [totalItems, data] = await Promise.all([
      this.prismaService.knowledgeResource.count({ where: { deletedAt: null, userId } }),
      this.prismaService.knowledgeResource.findMany({
        where: {
          deletedAt: null,
          userId,
          ...(title
            ? {
                title: {
                  contains: title,
                  mode: "insensitive",
                },
              }
            : {}),
        },
        skip,
        take,
        include: {
          items: {
            where: {
              deletedAt: null,
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
      hasNextPage: pagination.page < Math.ceil(totalItems / pagination.limit),
    }
  }

  async listTag(pagination: GetKnowledgeTagsQueryType): Promise<GetKnowledgeTagsResType> {
    const skip = (Number(pagination.page) - 1) * Number(pagination.limit)
    const take = Number(pagination.limit)
    const [totalItems, data] = await Promise.all([
      this.prismaService.knowledgeTag.count({
        where: { deletedAt: null, knowledgeItemId: pagination.knowledgeItemId },
      }),
      this.prismaService.knowledgeTag.findMany({
        where: { deletedAt: null, knowledgeItemId: pagination.knowledgeItemId },
        skip,
        take,
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
      include: {
        tags: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  create({ data }: { data: Omit<UpsertKnowledgeItemBodyType, "tags"> }): Promise<KnowledgeItem> {
    return this.prismaService.knowledgeItem.create({
      data,
    }) as any
  }

  createResource({ data }: { data: UpsertKnowledgeResourceBodyType }): Promise<KnowledgeResource> {
    return this.prismaService.knowledgeResource.create({
      data,
    }) as any
  }

  createTag({ data }: { data: UpsertKnowledgeTagBodyType }): Promise<KnowledgeTag> {
    return this.prismaService.knowledgeTag.create({
      data,
    }) as any
  }

  update({ id, data }: { id: number; data: Omit<UpsertKnowledgeItemBodyType, "tags"> }): Promise<KnowledgeItem> {
    return this.prismaService.knowledgeItem.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        type: data.type,
        knowledgeResourceId: data.knowledgeResourceId,
        isFavorite: data.isFavorite,
        isArchived: data.isArchived,
      },
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

  updateTag({ id, data }: { id: number; data: UpsertKnowledgeTagBodyType }): Promise<KnowledgeTag> {
    return this.prismaService.knowledgeTag.update({
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

  deleteTag(id: number): Promise<KnowledgeTag> {
    return this.prismaService.knowledgeTag.delete({
      where: {
        id,
        deletedAt: null,
      },
    }) as any
  }
}
