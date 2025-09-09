/*
  Warnings:

  - You are about to drop the column `nextFollowUpDate` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "nextFollowUpDate",
ADD COLUMN     "firstContactDate" TIMESTAMP(3),
ADD COLUMN     "firstContactEmailSent" BOOLEAN DEFAULT false,
ADD COLUMN     "secondContactDate" TIMESTAMP(3),
ADD COLUMN     "secondContactEmailSent" BOOLEAN DEFAULT false,
ADD COLUMN     "thirdContactDate" TIMESTAMP(3),
ADD COLUMN     "thirdContactEmailSent" BOOLEAN DEFAULT false,
ALTER COLUMN "appliedDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "appliedDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "archived" DROP NOT NULL;
