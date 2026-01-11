import { Injectable } from "@nestjs/common";

import { SerializeAll } from "src/shared/constants/serialize.decorator";
import { PrismaService } from "src/shared/services/prisma.service";

import { GetKnowledgeItemsQueryType, GetKnowledgeItemsResType, KnowledgeItem, UpsertKnowledgeItemBodyType } from "./knowledge-hub.model";

@Injectable()
@SerializeAll()
export class KnowledgeHubRepo {
    constructor(private prismaService: PrismaService){}

    async list(pagination: GetKnowledgeItemsQueryType): Promise<GetKnowledgeItemsResType>{
        const skip = (Number(pagination.page) - 1) * Number(pagination.limit)
        const take = Number(pagination.limit)
        const [totalItems, data] = await Promise.all([
            this.prismaService.knowledgeItem.count({where: {deletedAt: null}}),
            this.prismaService.knowledgeItem.findMany({
                where: {deletedAt: null},
                skip,
                take
            })
        ])
        return {
            data,
            totalItems,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(totalItems / pagination.limit)
        }
    }

    findById(id: number){
        return this.prismaService.knowledgeItem.findUnique({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    create({data}: {data: UpsertKnowledgeItemBodyType}): Promise<KnowledgeItem>{
        return this.prismaService.knowledgeItem.create({
            data
        }) as any
    }

    update({id, data}: {id: number, data: UpsertKnowledgeItemBodyType}): Promise<KnowledgeItem>{
        return this.prismaService.knowledgeItem.update({
            where: {
                id,
                deletedAt: null
            },
            data
        }) as any
    }

    delete(id: number): Promise<KnowledgeItem>{
        return this.prismaService.knowledgeItem.delete({
            where: {
                id,
                deletedAt: null
            }
        }) as any
    }
}