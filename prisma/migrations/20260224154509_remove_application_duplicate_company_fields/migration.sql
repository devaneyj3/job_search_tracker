/*
  Warnings:

  - You are about to drop the column `description` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Application` table. All the data in the column will be lost.
  - Made the column `companyId` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_companyId_fkey";

-- DropIndex
DROP INDEX "Application_industry_idx";

-- DropIndex
DROP INDEX "Application_name_idx";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "description",
DROP COLUMN "industry",
DROP COLUMN "linkedinUrl",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "size",
DROP COLUMN "website",
ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
