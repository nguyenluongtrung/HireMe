-- CreateTable
CREATE TABLE "KnowledgeResource" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(600) NOT NULL,
    "type" "KnowledgeItemType" NOT NULL DEFAULT 'FILE',
    "order" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KnowledgeResource_userId_idx" ON "KnowledgeResource"("userId");

-- CreateIndex
CREATE INDEX "KnowledgeResource_deletedAt_idx" ON "KnowledgeResource"("deletedAt");

-- CreateIndex
CREATE INDEX "KnowledgeResource_type_idx" ON "KnowledgeResource"("type");

-- AddForeignKey
ALTER TABLE "KnowledgeResource" ADD CONSTRAINT "KnowledgeResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
