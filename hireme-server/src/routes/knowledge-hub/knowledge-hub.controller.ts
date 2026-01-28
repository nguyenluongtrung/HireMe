import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { ZodResponse } from "nestjs-zod"

import { ActiveUser } from "src/shared/decorators/active-user.decorator"
import { MessageResDTO } from "src/shared/dtos/response.dto"

import { KnowledgeHubService } from "./knowledge-hub.service"
import {
  GetKnowledgeItemDetailResDTO,
  GetKnowledgeItemsQueryDTO,
  GetKnowledgeItemsResDTO,
  UpsertKnowledgeItemBodyDTO,
  UpsertKnowledgeItemResDTO,
} from "./knowledge-hub.dto"
import { slugify } from "src/shared/helpers"

@Controller("knowledge-hub/items")
export class KnowledgeHubController {
  constructor(private readonly knowledgeHubService: KnowledgeHubService) {}

  @Get()
  @ZodResponse({ type: GetKnowledgeItemsResDTO })
  list(@Query() query: GetKnowledgeItemsQueryDTO, @ActiveUser("userId") userId: number) {
    return this.knowledgeHubService.list({
      page: query.page,
      limit: query.limit,
      userId,
    })
  }

  @Get(":itemId")
  //   @ZodResponse({type: GetKnowledgeItemDetailResDTO})
  findById(@Param("itemId") itemId: string) {
    return this.knowledgeHubService.findById(Number(itemId))
  }

  @Post()
  @ZodResponse({ type: UpsertKnowledgeItemResDTO })
  create(@Body() body: UpsertKnowledgeItemBodyDTO, @ActiveUser("userId") userId: number) {
    return this.knowledgeHubService.create({
      data: {
        ...body,
        userId,
        slug: slugify(body.title),
      },
    })
  }

  @Patch(":itemId")
  @ZodResponse({ type: UpsertKnowledgeItemResDTO })
  update(@Body() body: UpsertKnowledgeItemBodyDTO, @Param("itemId") itemId: string) {
    return this.knowledgeHubService.update({
      data: {
        ...body,
        slug: slugify(body.title),
      },
      id: Number(itemId),
    })
  }

  @Delete(":itemId")
  @ZodResponse({ type: MessageResDTO })
  delete(@Param("itemId") itemId: string) {
    return this.knowledgeHubService.delete(Number(itemId))
  }
}
