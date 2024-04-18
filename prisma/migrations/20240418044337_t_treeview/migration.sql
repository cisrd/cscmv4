/*
  Warnings:

  - You are about to drop the column `adresse` on the `TTreeview` table. All the data in the column will be lost.
  - You are about to drop the column `projectCode` on the `TTreeview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TTreeview" DROP COLUMN "adresse",
DROP COLUMN "projectCode",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isMenuEnginnering" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRemoved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSalesCenter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTender" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "poFooter" TEXT;
