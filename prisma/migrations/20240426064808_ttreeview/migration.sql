-- CreateTable
CREATE TABLE "TTreeviewSupplier" (
    "id" SERIAL NOT NULL,
    "createdBy" VARCHAR(50),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" VARCHAR(50),
    "supplierId" INTEGER NOT NULL,
    "treeviewId" INTEGER NOT NULL,
    "comment1" TEXT,
    "comment2" TEXT,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "TTreeviewSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TDocumentPurchase" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "dateDelivery" TIMESTAMP(3),
    "deliveryPlace" TEXT,
    "comment" TEXT,
    "createdBy" VARCHAR(50),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" VARCHAR(50),
    "treeviewId" INTEGER NOT NULL,
    "treeviewSupplierId" INTEGER NOT NULL,

    CONSTRAINT "TDocumentPurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TTreeviewSupplier" ADD CONSTRAINT "TTreeviewSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "TSupplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TTreeviewSupplier" ADD CONSTRAINT "TTreeviewSupplier_treeviewId_fkey" FOREIGN KEY ("treeviewId") REFERENCES "TTreeview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TDocumentPurchase" ADD CONSTRAINT "TDocumentPurchase_treeviewId_fkey" FOREIGN KEY ("treeviewId") REFERENCES "TTreeview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TDocumentPurchase" ADD CONSTRAINT "TDocumentPurchase_treeviewSupplierId_fkey" FOREIGN KEY ("treeviewSupplierId") REFERENCES "TTreeviewSupplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
