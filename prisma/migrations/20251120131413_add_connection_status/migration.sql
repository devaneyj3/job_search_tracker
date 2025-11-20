-- AlterTable
ALTER TABLE "Connection" ADD COLUMN "status" TEXT,
ADD COLUMN "statusDate" TIMESTAMP(6);

-- CreateIndex
CREATE INDEX "Connection_status_idx" ON "Connection"("status");

