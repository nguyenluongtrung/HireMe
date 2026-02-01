import { KnowledgeItemType } from "@/contants/enums";

export interface KnowledgeResource {
  id: number;
  title: string;
  slug: string;
  type: KnowledgeItemType;
  deletedAt: Date | string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}

export interface KnowledgeItem extends KnowledgeResource {
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
}
