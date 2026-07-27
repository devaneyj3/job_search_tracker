-- Add companyName columns
ALTER TABLE "Connection" ADD COLUMN IF NOT EXISTS "companyName" TEXT;
ALTER TABLE "Application" ADD COLUMN IF NOT EXISTS "companyName" TEXT;

-- Backfill from Company when present
UPDATE "Connection" c
SET "companyName" = co."name"
FROM "Company" co
WHERE c."companyId" = co."id" AND c."companyName" IS NULL;

UPDATE "Application" a
SET "companyName" = co."name"
FROM "Company" co
WHERE a."companyId" = co."id" AND a."companyName" IS NULL;

UPDATE "Connection" SET "companyName" = 'Unknown' WHERE "companyName" IS NULL;
UPDATE "Application" SET "companyName" = 'Unknown' WHERE "companyName" IS NULL;

ALTER TABLE "Connection" ALTER COLUMN "companyName" SET NOT NULL;
ALTER TABLE "Application" ALTER COLUMN "companyName" SET NOT NULL;

ALTER TABLE "Connection" DROP CONSTRAINT IF EXISTS "Connection_companyId_fkey";
ALTER TABLE "Connection" DROP COLUMN IF EXISTS "companyId";

ALTER TABLE "Application" DROP CONSTRAINT IF EXISTS "Application_companyId_fkey";
ALTER TABLE "Application" DROP COLUMN IF EXISTS "companyId";

DROP INDEX IF EXISTS "Application_companyId_idx";
DROP INDEX IF EXISTS "Connection_companyId_idx";
DROP INDEX IF EXISTS "Company_userId_idx";
DROP INDEX IF EXISTS "Company_status_idx";
DROP INDEX IF EXISTS "Company_name_idx";
DROP INDEX IF EXISTS "Company_industry_idx";

DROP TABLE IF EXISTS "Company";
