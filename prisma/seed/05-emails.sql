INSERT INTO "public"."Email" (
  "connectionId", "subject", "body", "sequence", "sent", "sentAt", "createdAt"
)
SELECT v."connectionId", v."subject", v."body", v."sequence", v."sent", v."sentAt", v."createdAt"
FROM (VALUES
  (2,  '(imported)'::text, ''::text, 1, true, '2026-06-08 18:32:18.505'::timestamp, '2026-02-09 17:31:28.113'::timestamp),
  (3,  '(imported)', '', 1, true, '2026-06-08 18:31:39.084', '2026-02-11 15:52:56.72'),
  (4,  '(imported)', '', 1, true, '2026-06-08 18:31:01.693', '2026-02-16 16:42:13.118'),
  (6,  '(imported)', '', 1, true, '2026-06-08 18:33:19.455', '2026-02-04 17:01:15.856'),
  (7,  '(imported)', '', 1, true, '2026-06-08 18:30:26.048', '2026-02-16 17:12:35.468'),
  (11, '(imported)', '', 1, true, '2026-06-08 18:29:41.454', '2026-02-23 17:38:07.473'),
  (13, '(imported)', '', 1, true, '2026-06-08 18:29:01.601', '2026-02-23 18:03:43.8'),
  (14, '(imported)', '', 1, true, '2026-06-08 18:27:59.855', '2026-02-23 18:29:24.109'),
  (15, '(imported)', '', 1, true, '2026-06-08 18:26:47.419', '2026-02-24 16:03:23.064'),
  (16, '(imported)', '', 1, true, '2026-06-08 18:26:03.56',  '2026-02-24 16:13:56.635'),
  (17, '(imported)', '', 1, true, '2026-06-08 18:24:42.264', '2026-03-09 19:19:47.672'),
  (19, '(imported)', '', 1, true, '2026-06-08 17:00:11.937', '2026-03-30 17:38:20.667'),
  (20, '(imported)', '', 1, true, '2026-06-08 16:29:12.314', '2026-03-30 17:48:41.815'),
  (21, '(imported)', '', 1, true, '2026-06-08 18:17:28.247', '2026-04-13 22:29:48.575'),
  (34, '(imported)', '', 1, true, '2026-06-09 16:33:30.972', '2026-06-09 16:32:57.867')
) AS v("connectionId", "subject", "body", "sequence", "sent", "sentAt", "createdAt")
WHERE NOT EXISTS (
  SELECT 1
  FROM "public"."Email" e
  WHERE e."connectionId" = v."connectionId"
    AND e."sequence" = v."sequence"
);

SELECT setval('"Email_id_seq"', COALESCE((SELECT MAX("id") FROM "Email"), 1));
