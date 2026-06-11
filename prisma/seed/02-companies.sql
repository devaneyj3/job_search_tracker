INSERT INTO "public"."Company" (
  "id", "userId", "name", "website", "industry", "size", "location",
  "description", "linkedinUrl", "status", "statusDate", "notes",
  "archived", "archivedDate", "createdAt", "updatedAt"
) VALUES
(1,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Nutshell',           'https://nutshell.com',           NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(3,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Qualia',             'https://qualia.com',             NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(4,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'SkySpecs',           'https://skyspecs.com',           NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(5,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Atomic Object',      'https://atomicobject.com',       NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(6,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Optilogic',          'https://optilogic.com',          NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(8,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Menlo Innovations',  'https://menloinnovations.com',   NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(9,  'd7805411-8e39-4a2a-9c31-075bf66c8171', 'HealPay',            'https://healpay.com',            NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(10, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Voxel51',            'https://voxel51.com',            NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(11, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'AdvantageCS',        'https://advantagecs.com',        NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(12, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Amesite',            'https://amesite.com',            NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(13, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Treetown Tech',      'https://treetowntech.com',       NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(14, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Black Rock Tech',    'https://black-rock.tech',        NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(15, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'ArborMetrix',        'https://arbormetrix.com',        NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(17, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'RBN.ai',             'https://rbn.ai',                 NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(19, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Cynerge',            'https://cynerge.com',            NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(20, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Northbeam',          'https://northbeam.io',           NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(21, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Recruyt',            'https://recruyt.com',            NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW()),
(24, 'd7805411-8e39-4a2a-9c31-075bf66c8171', 'Hightouch',          'https://hightouch.com',          NULL, NULL, NULL, NULL, NULL, 'Researching', NULL, '', false, NULL, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

SELECT setval('"Company_id_seq"', (SELECT MAX("id") FROM "Company"));
