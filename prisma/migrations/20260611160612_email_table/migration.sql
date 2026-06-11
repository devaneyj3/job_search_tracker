/*
  Warnings:

  - You are about to drop the column `firstEmailDate` on the `Connection` table. All the data in the column will be lost.
  - Made the column `emailSent` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailCount` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `responded` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `archived` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Connection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Connection` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Connection_companyId_idx";

-- DropIndex
DROP INDEX "Connection_connectedDate_idx";

-- DropIndex
DROP INDEX "Connection_emailSent_idx";

-- DropIndex
DROP INDEX "Connection_status_idx";

-- DropIndex
DROP INDEX "Connection_userId_idx";

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "firstEmailDate",
ALTER COLUMN "connectedDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "emailSent" SET NOT NULL,
ALTER COLUMN "lastEmailDate" DROP DEFAULT,
ALTER COLUMN "lastEmailDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "emailCount" SET NOT NULL,
ALTER COLUMN "responded" SET NOT NULL,
ALTER COLUMN "responseDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "archived" SET NOT NULL,
ALTER COLUMN "archivedDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Email_connectionId_idx" ON "Email"("connectionId");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
