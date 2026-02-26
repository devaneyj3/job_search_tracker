-- Add required Application jobType/location with safe defaults for existing rows.
ALTER TABLE "Application"
ADD COLUMN "jobType" TEXT NOT NULL DEFAULT 'Full Time',
ADD COLUMN "location" TEXT NOT NULL DEFAULT 'Remote';

-- Drop defaults so future writes must provide values from app logic.
ALTER TABLE "Application"
ALTER COLUMN "jobType" DROP DEFAULT,
ALTER COLUMN "location" DROP DEFAULT;
