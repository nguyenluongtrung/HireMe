import { KnowledgeItemType } from "@/contants/enums";

export interface KnowledgeItem {
  id: number;
  title: string;
  slug: string;
  type: KnowledgeItemType;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  deletedAt: Date | string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}
