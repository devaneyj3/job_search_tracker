-- Add required Application fields with safe backfill defaults for existing rows.
ALTER TABLE "Application"
ADD COLUMN "position" TEXT NOT NULL DEFAULT 'Unknown Position',
ADD COLUMN "jobDescription" TEXT NOT NULL DEFAULT 'TBD';

-- Drop defaults so future writes must provide explicit values from app logic.
ALTER TABLE "Application"
ALTER COLUMN "position" DROP DEFAULT,
ALTER COLUMN "jobDescription" DROP DEFAULT;
