-- Bulk update script to add sample skills to existing job applications
-- Sets skill1 to "React" and skill2 to "Javascript" for all existing records
-- Only updates records where skill1 or skill2 are NULL or empty

UPDATE "Application"
SET 
  skill1 = 'React',
  skill2 = 'Javascript'
WHERE 
  (skill1 IS NULL OR skill1 = '') 
  OR 
  (skill2 IS NULL OR skill2 = '');

-- Optional: If you want to update ALL records regardless of current values, use this instead:
-- UPDATE "Application"
-- SET 
--   skill1 = 'React',
--   skill2 = 'Javascript';

-- Verify the update (run this to see how many records were updated)
-- SELECT COUNT(*) as updated_records
-- FROM "Application"
-- WHERE skill1 = 'React' AND skill2 = 'Javascript';

