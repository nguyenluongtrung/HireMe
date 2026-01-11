-- CreateEnum
CREATE TYPE "KnowledgeItemType" AS ENUM ('FOLDER', 'FILE');

-- CreateTable
CREATE TABLE "KnowledgeItem" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "type" "KnowledgeItemType" NOT NULL DEFAULT 'FILE',
    "content" TEXT,
    "parentId" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeTag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "knowledgeItemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KnowledgeItem_userId_idx" ON "KnowledgeItem"("userId");

-- CreateIndex
CREATE INDEX "KnowledgeItem_parentId_idx" ON "KnowledgeItem"("parentId");

-- CreateIndex
CREATE INDEX "KnowledgeItem_deletedAt_idx" ON "KnowledgeItem"("deletedAt");

-- CreateIndex
CREATE INDEX "KnowledgeItem_type_idx" ON "KnowledgeItem"("type");

-- CreateIndex
CREATE INDEX "KnowledgeTag_knowledgeItemId_idx" ON "KnowledgeTag"("knowledgeItemId");

-- AddForeignKey
ALTER TABLE "KnowledgeItem" ADD CONSTRAINT "KnowledgeItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "KnowledgeItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "KnowledgeItem" ADD CONSTRAINT "KnowledgeItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "KnowledgeTag" ADD CONSTRAINT "KnowledgeTag_knowledgeItemId_fkey" FOREIGN KEY ("knowledgeItemId") REFERENCES "KnowledgeItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
