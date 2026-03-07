import { AxiosResponse } from "axios";

import { apiEndpoints } from "@/contants/routers";

import {
  KnowledgeItem,
  KnowledgeItemTag,
  KnowledgeResource,
} from "@/interfaces/knowledge-item";
import { Pagination } from "@/interfaces/pagination";

import api from "@/base/api";

export const createKnowledgeItem = (data: Partial<KnowledgeItem>) => {
  return api.post(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_ITEMS, data);
};

export const updateKnowledgeItem = (
  id: number,
  data: Partial<KnowledgeItem>,
) => {
  return api.patch(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_ITEM_DETAIL(id), data);
};

export const deleteKnowledgeItem = (id: number) => {
  return api.delete(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_ITEM_DETAIL(id));
};

export const getKnowledgeResources = (params?: {
  page: number;
  limit: number;
  searchDebounce?: string;
}): Promise<AxiosResponse<Pagination<KnowledgeResource[]>>> => {
  const query = new URLSearchParams();

  if (params?.page !== undefined) {
    query.append("page", params.page.toString());
  }

  if (params?.limit !== undefined) {
    query.append("limit", params.limit.toString());
  }

  if (params?.searchDebounce) {
    query.append("title", params.searchDebounce);
  }

  const endPoint = `${apiEndpoints.SYSTEM.KNOWLEDGE_HUB_RESOURCES}?${query.toString()}`;

  return api.get(endPoint);
};

export const getKnowledgeItem = (id: number) => {
  return api.get(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_ITEM_DETAIL(id));
};

export const createKnowledgeResource = (data: Partial<KnowledgeResource>) => {
  return api.post(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_RESOURCES, data);
};

export const updateKnowledgeResource = (
  id: number,
  data: Partial<KnowledgeResource>,
) => {
  return api.patch(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_RESOURCE_DETAIL(id), data);
};

export const deleteKnowledgeResource = (id: number) => {
  return api.delete(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_RESOURCE_DETAIL(id));
};

export const getKnowledgeTag = (id: number) => {
  return api.get(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_TAG_DETAIL(id));
};

export const createKnowledgeTag = (data: Partial<KnowledgeItemTag>) => {
  return api.post(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_TAGS, data);
};

export const updateKnowledgeTag = (
  id: number,
  data: Partial<KnowledgeItemTag>,
) => {
  return api.patch(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_TAG_DETAIL(id), data);
};

export const deleteKnowledgeTag = (id: number) => {
  return api.delete(apiEndpoints.SYSTEM.KNOWLEDGE_HUB_TAG_DETAIL(id));
};
