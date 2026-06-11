-- Ensures the seed user exists. Safe to re-run if the user was created via OAuth.
INSERT INTO "public"."User" ("id", "name", "email", "createdAt", "updatedAt")
VALUES ('d7805411-8e39-4a2a-9c31-075bf66c8171', 'NO_NAME', NULL, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;
