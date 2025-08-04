-- AlterTable
ALTER TABLE "header_staging" ALTER COLUMN "logoWidth" SET DEFAULT '2.5rem',
ALTER COLUMN "logoHeight" SET DEFAULT '2.5rem',
ALTER COLUMN "headerHeight" SET DEFAULT '3.75rem';

-- AlterTable
ALTER TABLE "headers" ALTER COLUMN "logoWidth" SET DEFAULT '2.5rem',
ALTER COLUMN "logoHeight" SET DEFAULT '2.5rem',
ALTER COLUMN "headerHeight" SET DEFAULT '3.75rem';
