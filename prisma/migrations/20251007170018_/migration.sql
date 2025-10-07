-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "heard_back_date" DROP NOT NULL,
ALTER COLUMN "heard_back_date" DROP DEFAULT,
ALTER COLUMN "heard_back_date" SET DATA TYPE TIMESTAMP(3);
