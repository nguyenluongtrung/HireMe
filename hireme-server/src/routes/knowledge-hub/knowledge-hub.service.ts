import { Injectable } from "@nestjs/common"

import { NotFoundRecordException } from "src/shared/error"
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from "src/shared/helpers"

import { KnowledgeHubRepo } from "./knowledge-hub.repo"
import {
  GetKnowledgeItemsQueryType,
  GetKnowledgeResourcesQueryType,
  GetKnowledgeTagsQueryType,
  UpsertKnowledgeItemBodyType,
  UpsertKnowledgeResourceBodyType,
  UpsertKnowledgeTagBodyType,
} from "./knowledge-hub.model"
import {
  KnowledgeItemAlreadyExistsException,
  KnowledgeResourceAlreadyExistsException,
  KnowledgeTagAlreadyExistsException,
} from "./knowledge-hub.error"

@Injectable()
export class KnowledgeHubService {
  constructor(private knowledgeHubRepo: KnowledgeHubRepo) {}

  async list(pagination: GetKnowledgeItemsQueryType) {
    const data = await this.knowledgeHubRepo.list(pagination)
    return data
  }

  async listResource(pagination: GetKnowledgeResourcesQueryType) {
    const data = await this.knowledgeHubRepo.listResource(pagination)
    return data
  }

  async listTag(pagination: GetKnowledgeTagsQueryType) {
    const data = await this.knowledgeHubRepo.listTag(pagination)
    return data
  }

  async findById(id: number) {
    const knowledgeItem = await this.knowledgeHubRepo.findById(id)
    if (!knowledgeItem) {
      throw NotFoundRecordException
    }
    return knowledgeItem
  }

  async createKnowledgeItem({ data }: { data: UpsertKnowledgeItemBodyType }) {
    try {
      const knowledgeItem = await this.knowledgeHubRepo.create({
        data,
      })
      return knowledgeItem
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeItemAlreadyExistsException
      }
      throw error
    }
  }

  async createResource({ data }: { data: UpsertKnowledgeResourceBodyType }) {
    try {
      const knowledgeResource = await this.knowledgeHubRepo.createResource({
        data,
      })
      return knowledgeResource
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeResourceAlreadyExistsException
      }
      throw error
    }
  }

  async createTag({ data }: { data: UpsertKnowledgeTagBodyType }) {
    try {
      const knowledgeTag = await this.knowledgeHubRepo.createTag({
        data,
      })
      return knowledgeTag
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeTagAlreadyExistsException
      }
      throw error
    }
  }

  async updateResource({ id, data }: { id: number; data: UpsertKnowledgeResourceBodyType }) {
    try {
      const knowledgeResource = await this.knowledgeHubRepo.updateResource({
        id,
        data,
      })

      return knowledgeResource
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeResourceAlreadyExistsException
      }
      throw error
    }
  }

  async updateKnowledgeItem({ id, data }: { id: number; data: UpsertKnowledgeItemBodyType }) {
    try {
      const knowledgeItem = await this.knowledgeHubRepo.update({
        id,
        data,
      })

      return knowledgeItem
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeItemAlreadyExistsException
      }
      throw error
    }
  }

  async updateTag({ id, data }: { id: number; data: UpsertKnowledgeTagBodyType }) {
    try {
      const knowledgeTag = await this.knowledgeHubRepo.updateTag({
        id,
        data,
      })

      return knowledgeTag
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      if (isUniqueConstraintPrismaError(error)) {
        throw KnowledgeTagAlreadyExistsException
      }
      throw error
    }
  }

  async deleteKnowledgeItem(id: number) {
    try {
      await this.knowledgeHubRepo.delete(id)
      return {
        message: "Delete successfully",
      }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteResource(id: number) {
    try {
      await this.knowledgeHubRepo.deleteResource(id)
      return {
        message: "Delete successfully",
      }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }

  async deleteTag(id: number) {
    try {
      await this.knowledgeHubRepo.deleteTag(id)
      return {
        message: "Delete successfully",
      }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw NotFoundRecordException
      }
      throw error
    }
  }
}
