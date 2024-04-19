/*
  Warnings:

  - You are about to drop the column `Discount` on the `INVOICE_ORDER_PRODUCT_DETAILS` table. All the data in the column will be lost.
  - You are about to drop the column `Client_Fk` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Discount` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Employee_Fk` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `ISV` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Order_File` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Read` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `ReadClient` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Subtotal` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Discount` on the `PURCHASE_ORDER_DETAILED` table. All the data in the column will be lost.
  - You are about to drop the `ACCOUNT_PLAYABLE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ACCOUNT_RECEIVABLE` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Supplier_Fk` to the `PURCHASE_ORDER` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PURCHASE_ORDER" DROP CONSTRAINT "PURCHASE_ORDER_Client_Fk_fkey";

-- DropForeignKey
ALTER TABLE "PURCHASE_ORDER" DROP CONSTRAINT "PURCHASE_ORDER_Employee_Fk_fkey";

-- AlterTable
ALTER TABLE "INVOICE_ORDER_PRODUCT_DETAILS" DROP COLUMN "Discount";

-- AlterTable
ALTER TABLE "PURCHASE_ORDER" DROP COLUMN "Client_Fk",
DROP COLUMN "Discount",
DROP COLUMN "Employee_Fk",
DROP COLUMN "ISV",
DROP COLUMN "Order_File",
DROP COLUMN "Read",
DROP COLUMN "ReadClient",
DROP COLUMN "Subtotal",
ADD COLUMN     "Invoice_File" TEXT,
ADD COLUMN     "Supplier_Fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PURCHASE_ORDER_DETAILED" DROP COLUMN "Discount";

-- DropTable
DROP TABLE "ACCOUNT_PLAYABLE";

-- DropTable
DROP TABLE "ACCOUNT_RECEIVABLE";

-- CreateTable
CREATE TABLE "SALE_ORDER" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Client_Fk" INTEGER NOT NULL,
    "Employee_Fk" INTEGER NOT NULL,
    "Order_File" TEXT,
    "State" "REQUEST_STATE" NOT NULL,
    "Read" BOOLEAN NOT NULL,
    "ReadClient" BOOLEAN NOT NULL,
    "Subtotal" DOUBLE PRECISION NOT NULL,
    "Discount" DOUBLE PRECISION,
    "ISV" DOUBLE PRECISION NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SALE_ORDER_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "PURCHASE_ORDER" ADD CONSTRAINT "PURCHASE_ORDER_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES "SUPPLIER"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SALE_ORDER" ADD CONSTRAINT "SALE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SALE_ORDER" ADD CONSTRAINT "SALE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES "EMPLOYEE"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
