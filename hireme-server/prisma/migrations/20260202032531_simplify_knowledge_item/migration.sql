/*
  Warnings:

  - You are about to drop the column `order` on the `KnowledgeItem` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `KnowledgeItem` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `KnowledgeResource` table. All the data in the column will be lost.
  - Made the column `knowledgeResourceId` on table `KnowledgeItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "KnowledgeItem" DROP CONSTRAINT "KnowledgeItem_knowledgeResourceId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeItem" DROP CONSTRAINT "KnowledgeItem_parentId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeItem" DROP CONSTRAINT "KnowledgeItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeResource" DROP CONSTRAINT "KnowledgeResource_userId_fkey";

-- DropIndex
DROP INDEX "KnowledgeItem_parentId_idx";

-- AlterTable
ALTER TABLE "KnowledgeItem" DROP COLUMN "order",
DROP COLUMN "parentId",
ALTER COLUMN "knowledgeResourceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "KnowledgeResource" DROP COLUMN "order";

-- AddForeignKey
ALTER TABLE "KnowledgeResource" ADD CONSTRAINT "KnowledgeResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeItem" ADD CONSTRAINT "KnowledgeItem_knowledgeResourceId_fkey" FOREIGN KEY ("knowledgeResourceId") REFERENCES "KnowledgeResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeItem" ADD CONSTRAINT "KnowledgeItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
