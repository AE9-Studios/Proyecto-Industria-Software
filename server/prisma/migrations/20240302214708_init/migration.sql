/*
  Warnings:

  - Added the required column `Product_Fk` to the `INVENTORY_MOVEMENT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "INVENTORY_MOVEMENT" ADD COLUMN     "Product_Fk" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "INVENTORY_MOVEMENT" ADD CONSTRAINT "INVENTORY_MOVEMENT_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES "PRODUCT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
