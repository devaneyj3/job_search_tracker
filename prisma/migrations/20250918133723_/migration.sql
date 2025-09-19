/*
  Warnings:

  - You are about to drop the column `firstContactDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `firstContactEmailSent` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `thirdContactDate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `thirdContactEmailSent` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "firstContactDate",
DROP COLUMN "firstContactEmailSent",
DROP COLUMN "thirdContactDate",
DROP COLUMN "thirdContactEmailSent",
ADD COLUMN     "initialContactDate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "initialContactEmailSent" BOOLEAN DEFAULT false;
