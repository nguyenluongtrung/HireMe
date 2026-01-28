import { apiEndpoints } from "@/contants/routers";

import { KnowledgeItem } from "@/interfaces/knowledge-item";

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
