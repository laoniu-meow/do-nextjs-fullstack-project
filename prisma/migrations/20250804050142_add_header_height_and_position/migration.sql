-- AlterTable
ALTER TABLE "header_staging" ADD COLUMN     "headerHeight" TEXT NOT NULL DEFAULT '60px',
ADD COLUMN     "headerPosition" TEXT NOT NULL DEFAULT 'fixed';

-- AlterTable
ALTER TABLE "headers" ADD COLUMN     "headerHeight" TEXT NOT NULL DEFAULT '60px',
ADD COLUMN     "headerPosition" TEXT NOT NULL DEFAULT 'fixed';
