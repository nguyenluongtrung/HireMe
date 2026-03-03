import { KnowledgeItemType } from "@/contants/enums";

export interface KnowledgeResource {
  id?: number;
  title?: string;
  slug?: string;
  type?: KnowledgeItemType;
  items?: KnowledgeItem[];
  tags?: KnowledgeItemTag[];
  deletedAt?: Date | string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface KnowledgeItem extends KnowledgeResource {
  content?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
  knowledgeResourceId?: number;
}

export interface KnowledgeItemTag {
  id: number;
  title: string;
}
