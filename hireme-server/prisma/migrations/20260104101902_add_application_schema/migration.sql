-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPLIED', 'INTERVIEWED', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(500) NOT NULL,
    "position" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "dateApplied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_deletedAt_idx" ON "Application"("deletedAt");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
