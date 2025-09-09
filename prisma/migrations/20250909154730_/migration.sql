-- AlterTable
ALTER TABLE "public"."Application" ALTER COLUMN "firstContactDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "firstContactDate" SET DATA TYPE TIMESTAMP(6);
