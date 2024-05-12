/*
  Warnings:

  - You are about to drop the column `title` on the `ProductOptionValue` table. All the data in the column will be lost.
  - Added the required column `value` to the `ProductOptionValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOptionValue" DROP COLUMN "title",
ADD COLUMN     "value" TEXT NOT NULL;
