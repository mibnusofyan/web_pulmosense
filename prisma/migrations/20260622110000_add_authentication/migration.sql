ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;

UPDATE "User"
SET "role" = 'admin'
WHERE "role" NOT IN ('superadmin', 'admin');

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'admin';
