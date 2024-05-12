/*
  Warnings:

  - A unique constraint covering the columns `[optionId,variantId]` on the table `ProductOptionValue` will be added. If there are existing duplicate values, this will fail.
  - Made the column `variantId` on table `ProductOptionValue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductOptionValue" ALTER COLUMN "variantId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductOptionValue_optionId_variantId_key" ON "ProductOptionValue"("optionId", "variantId");
