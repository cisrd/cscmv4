-- CreateTable
CREATE TABLE "TSupplier" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50),
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "comment" VARCHAR(250),
    "status" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATE,
    "endDate" DATE,
    "createdBy" VARCHAR(50),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" VARCHAR(50),
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "TSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TCountry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(10) NOT NULL,

    CONSTRAINT "TCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TSupplierContact" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "comment" TEXT NOT NULL,
    "TSupplierId" INTEGER NOT NULL,

    CONSTRAINT "TSupplierContact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TSupplier" ADD CONSTRAINT "TSupplier_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "TCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TSupplierContact" ADD CONSTRAINT "TSupplierContact_TSupplierId_fkey" FOREIGN KEY ("TSupplierId") REFERENCES "TSupplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
