/*
  Warnings:

  - Added the required column `updatedAt` to the `KnowledgeTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KnowledgeTag" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "KnowledgeTag_deletedAt_idx" ON "KnowledgeTag"("deletedAt");
