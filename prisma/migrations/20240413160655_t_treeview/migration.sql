-- CreateTable
CREATE TABLE "TTreeview" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "isFm" BOOLEAN NOT NULL DEFAULT false,
    "adresse" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "codeAnalytic" VARCHAR(20) NOT NULL,

    CONSTRAINT "TTreeview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TTreeview" ADD CONSTRAINT "TTreeview_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TTreeview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
