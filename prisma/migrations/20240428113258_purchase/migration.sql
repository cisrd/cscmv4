/*
  Warnings:

  - Added the required column `status` to the `TDocumentPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TDocumentPurchase" ADD COLUMN     "converted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "idEntityDestination" INTEGER,
ADD COLUMN     "idPo" INTEGER,
ADD COLUMN     "idRfq" INTEGER,
ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "isBackcharge" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCashPurchase" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "removed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" VARCHAR(50) NOT NULL,
ADD COLUMN     "supplierAmount" DOUBLE PRECISION,
ADD COLUMN     "tDeliveryAddressId" INTEGER,
ADD COLUMN     "total" DOUBLE PRECISION,
ADD COLUMN     "totalWeight" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "TFamily" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(10) NOT NULL,

    CONSTRAINT "TFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TSubFamily" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "tFamilyId" INTEGER,

    CONSTRAINT "TSubFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "isProtein" BOOLEAN NOT NULL DEFAULT false,
    "tSubFamilyId" INTEGER,

    CONSTRAINT "TCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TUnit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(10) NOT NULL,

    CONSTRAINT "TUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TItem" (
    "id" SERIAL NOT NULL,
    "tUnitId" INTEGER,

    CONSTRAINT "TItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TDeliveryAddress" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "removed" BOOLEAN DEFAULT false,
    "createdBy" VARCHAR(50),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" VARCHAR(50),

    CONSTRAINT "TDeliveryAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TSubFamily" ADD CONSTRAINT "TSubFamily_tFamilyId_fkey" FOREIGN KEY ("tFamilyId") REFERENCES "TFamily"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TCategory" ADD CONSTRAINT "TCategory_tSubFamilyId_fkey" FOREIGN KEY ("tSubFamilyId") REFERENCES "TSubFamily"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TItem" ADD CONSTRAINT "TItem_tUnitId_fkey" FOREIGN KEY ("tUnitId") REFERENCES "TUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TDocumentPurchase" ADD CONSTRAINT "TDocumentPurchase_tDeliveryAddressId_fkey" FOREIGN KEY ("tDeliveryAddressId") REFERENCES "TDeliveryAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
