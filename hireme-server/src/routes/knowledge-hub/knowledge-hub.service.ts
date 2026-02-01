import { Injectable } from "@nestjs/common"

import { NotFoundRecordException } from "src/shared/error"
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from "src/shared/helpers"

import { KnowledgeHubRepo } from "./knowledge-hub.repo"
import {
  GetKnowledgeItemsQueryType,
  GetKnowledgeResourcesQueryType,
  UpsertKnowledgeItemBodyType,
  UpsertKnowledgeResourceBodyType,
} from "./knowledge-hub.model"
import { KnowledgeItemAlreadyExistsException, KnowledgeResourceAlreadyExistsException } from "./knowledge-hub.error"

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

  async findById(id: number) {
    const knowledgeItem = await this.knowledgeHubRepo.findById(id)
    if (!knowledgeItem) {
      throw NotFoundRecordException
    }
    return knowledgeItem
  }

  async create({ data }: { data: UpsertKnowledgeItemBodyType }) {
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

  async update({ id, data }: { id: number; data: UpsertKnowledgeItemBodyType }) {
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

  async delete(id: number) {
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
}
