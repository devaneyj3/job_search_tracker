/*
  Warnings:

  - Added the required column `applicationLink` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applicationLink" TEXT NOT NULL;
