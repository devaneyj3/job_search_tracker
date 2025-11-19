-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "company" TEXT,
    "position" TEXT,
    "linkedinUrl" TEXT,
    "connectedDate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "firstEmailDate" TIMESTAMP(6),
    "lastEmailDate" TIMESTAMP(6),
    "emailCount" INTEGER NOT NULL DEFAULT 0,
    "responded" BOOLEAN NOT NULL DEFAULT false,
    "responseDate" TIMESTAMP(6),
    "notes" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "archivedDate" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Connection_userId_idx" ON "Connection"("userId");

-- CreateIndex
CREATE INDEX "Connection_emailSent_idx" ON "Connection"("emailSent");

-- CreateIndex
CREATE INDEX "Connection_connectedDate_idx" ON "Connection"("connectedDate");

-- CreateIndex
CREATE INDEX "Connection_company_idx" ON "Connection"("company");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
