/*
  Warnings:

  - A unique constraint covering the columns `[value,optionId,variantId]` on the table `ProductOptionValue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductOptionValue_optionId_variantId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductOptionValue_value_optionId_variantId_key" ON "ProductOptionValue"("value", "optionId", "variantId");
