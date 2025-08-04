-- AlterTable
ALTER TABLE "header_staging" ADD COLUMN     "borderShadow" TEXT NOT NULL DEFAULT 'none',
ALTER COLUMN "logoWidth" SET DEFAULT '6rem',
ALTER COLUMN "logoHeight" SET DEFAULT '6rem';

-- AlterTable
ALTER TABLE "headers" ADD COLUMN     "borderShadow" TEXT NOT NULL DEFAULT 'none',
ALTER COLUMN "logoWidth" SET DEFAULT '6rem',
ALTER COLUMN "logoHeight" SET DEFAULT '6rem';
