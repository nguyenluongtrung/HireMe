import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { ZodResponse } from "nestjs-zod"

import { ActiveUser } from "src/shared/decorators/active-user.decorator"
import { MessageResDTO } from "src/shared/dtos/response.dto"

import { KnowledgeHubService } from "./knowledge-hub.service"
import {
  GetKnowledgeItemsQueryDTO,
  GetKnowledgeItemsResDTO,
  GetKnowledgeResourcesQueryDTO,
  GetKnowledgeResourcesResDTO,
  GetKnowledgeTagsQueryDTO,
  GetKnowledgeTagsResDTO,
  UpsertKnowledgeItemBodyDTO,
  UpsertKnowledgeItemResDTO,
  UpsertKnowledgeResourceBodyDTO,
  UpsertKnowledgeResourceResDTO,
  UpsertKnowledgeTagBodyDTO,
  UpsertKnowledgeTagResDTO,
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

  @Get("/resources")
  @ZodResponse({ type: GetKnowledgeResourcesResDTO })
  listResource(@Query() query: GetKnowledgeResourcesQueryDTO, @ActiveUser("userId") userId: number) {
    return this.knowledgeHubService.listResource({
      page: query.page,
      limit: query.limit,
      title: query.title,
      userId,
    })
  }

  @Get("/tags")
  @ZodResponse({ type: GetKnowledgeTagsResDTO })
  listTag(@Query() query: GetKnowledgeTagsQueryDTO) {
    return this.knowledgeHubService.listTag({
      page: query.page,
      limit: query.limit,
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
    return this.knowledgeHubService.createKnowledgeItem({
      data: {
        ...body,
        userId,
        slug: slugify(body.title),
      },
    })
  }

  @Post("/resources")
  @ZodResponse({ type: UpsertKnowledgeResourceResDTO })
  createResource(@Body() body: UpsertKnowledgeResourceBodyDTO, @ActiveUser("userId") userId: number) {
    return this.knowledgeHubService.createResource({
      data: {
        ...body,
        userId,
        slug: slugify(body.title),
      },
    })
  }

  @Post("/tags")
  // @ZodResponse({ type: UpsertKnowledgeTagResDTO })
  createTag(@Body() body: UpsertKnowledgeTagBodyDTO) {
    return this.knowledgeHubService.createTag({
      data: {
        ...body,
      },
    })
  }

  @Patch("/resources/:resourceId")
  @ZodResponse({ type: UpsertKnowledgeResourceResDTO })
  updateResource(
    @Body() body: UpsertKnowledgeResourceBodyDTO,
    @ActiveUser("userId") userId: number,
    @Param("resourceId") resourceId: string,
  ) {
    return this.knowledgeHubService.updateResource({
      data: {
        ...body,
        userId,
        slug: slugify(body.title),
      },
      id: Number(resourceId),
    })
  }

  @Patch("/tags/:tagId")
  // @ZodResponse({ type: UpsertKnowledgeTagResDTO })
  updateTag(@Body() body: UpsertKnowledgeTagBodyDTO, @Param("tagId") tagId: string) {
    return this.knowledgeHubService.updateTag({
      data: {
        ...body,
      },
      id: Number(tagId),
    })
  }

  @Patch(":itemId")
  @ZodResponse({ type: UpsertKnowledgeItemResDTO })
  update(@Body() body: UpsertKnowledgeItemBodyDTO, @Param("itemId") itemId: string) {
    return this.knowledgeHubService.updateKnowledgeItem({
      data: {
        ...body,
        slug: slugify(body.title),
      },
      id: Number(itemId),
    })
  }

  @Delete("/resources/:resourceId")
  @ZodResponse({ type: MessageResDTO })
  deleteResource(@Param("resourceId") resourceId: string) {
    console.log(resourceId)
    return this.knowledgeHubService.deleteResource(Number(resourceId))
  }

  @Delete("/tags/:tagId")
  @ZodResponse({ type: MessageResDTO })
  deleteTag(@Param("tagId") tagId: string) {
    return this.knowledgeHubService.deleteTag(Number(tagId))
  }

  @Delete(":itemId")
  @ZodResponse({ type: MessageResDTO })
  delete(@Param("itemId") itemId: string) {
    return this.knowledgeHubService.deleteKnowledgeItem(Number(itemId))
  }
}
