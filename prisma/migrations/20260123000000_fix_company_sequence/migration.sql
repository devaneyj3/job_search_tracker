-- Fix the Company id sequence to be in sync with existing data
-- This will set the sequence to the maximum existing ID + 1
SELECT setval('"Company_id_seq"', COALESCE((SELECT MAX(id) FROM "Company"), 1), true);
