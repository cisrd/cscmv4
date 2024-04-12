/*
  Warnings:

  - You are about to drop the column `statusIsCashPurchase` on the `TSupplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TSupplier" DROP COLUMN "statusIsCashPurchase",
ADD COLUMN     "statusCash" BOOLEAN NOT NULL DEFAULT false;
