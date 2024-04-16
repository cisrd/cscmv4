/*
  Warnings:

  - A unique constraint covering the columns `[name,parentId]` on the table `TTreeview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TTreeview_name_parentId_key" ON "TTreeview"("name", "parentId");
