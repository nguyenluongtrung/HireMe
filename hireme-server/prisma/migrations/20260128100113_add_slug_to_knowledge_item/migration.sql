/*
  Warnings:

  - Added the required column `slug` to the `KnowledgeItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KnowledgeItem" ADD COLUMN     "slug" VARCHAR(600) NOT NULL;
