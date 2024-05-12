/*
  Warnings:

  - A unique constraint covering the columns `[optionId,variantId]` on the table `ProductOptionValue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductOptionValue_optionId_variantId_key" ON "ProductOptionValue"("optionId", "variantId");
