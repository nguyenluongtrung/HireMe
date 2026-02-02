-- AlterTable
ALTER TABLE "KnowledgeItem" ADD COLUMN     "knowledgeResourceId" INTEGER;

-- CreateIndex
CREATE INDEX "KnowledgeItem_knowledgeResourceId_idx" ON "KnowledgeItem"("knowledgeResourceId");

-- AddForeignKey
ALTER TABLE "KnowledgeItem" ADD CONSTRAINT "KnowledgeItem_knowledgeResourceId_fkey" FOREIGN KEY ("knowledgeResourceId") REFERENCES "KnowledgeResource"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
