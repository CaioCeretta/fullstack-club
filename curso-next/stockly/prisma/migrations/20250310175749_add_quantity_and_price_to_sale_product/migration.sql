/*
  Warnings:

  - Added the required column `quantity` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;
