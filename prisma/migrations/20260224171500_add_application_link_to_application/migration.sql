-- Add required Application.applicationLink with safe defaults for existing rows.
ALTER TABLE "Application"
ADD COLUMN "applicationLink" TEXT NOT NULL DEFAULT 'https://example.com/application';

-- Remove default so new rows must provide a real value via app validation.
ALTER TABLE "Application"
ALTER COLUMN "applicationLink" DROP DEFAULT;
