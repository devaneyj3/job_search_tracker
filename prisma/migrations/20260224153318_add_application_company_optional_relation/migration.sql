-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "companyId" INTEGER;

-- CreateIndex
CREATE INDEX "Application_companyId_idx" ON "Application"("companyId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
