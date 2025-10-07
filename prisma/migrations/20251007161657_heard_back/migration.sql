-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "heard_back" BOOLEAN DEFAULT false,
ADD COLUMN     "heard_back_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
