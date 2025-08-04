-- AlterTable
ALTER TABLE "header_staging" ADD COLUMN     "logoOrientation" TEXT NOT NULL DEFAULT 'portrait';

-- AlterTable
ALTER TABLE "headers" ADD COLUMN     "logoOrientation" TEXT NOT NULL DEFAULT 'portrait';
