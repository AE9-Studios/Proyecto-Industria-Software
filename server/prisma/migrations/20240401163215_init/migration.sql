/*
  Warnings:

  - You are about to drop the column `Description` on the `INVOICE_ORDER` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `PURCHASE_ORDER` table. All the data in the column will be lost.
  - Added the required column `Read` to the `PURCHASE_ORDER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReadClient` to the `PURCHASE_ORDER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `PURCHASE_ORDER` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAY_METHOD" AS ENUM ('LINEA', 'CAJA');

-- DropForeignKey
ALTER TABLE "INVOICE_ORDER" DROP CONSTRAINT "INVOICE_ORDER_Client_Fk_fkey";

-- AlterTable
ALTER TABLE "INVOICE_ORDER" DROP COLUMN "Description",
ADD COLUMN     "Invoice_File" TEXT,
ADD COLUMN     "PayMethod" "PAY_METHOD" NOT NULL DEFAULT 'CAJA',
ALTER COLUMN "Client_Fk" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PURCHASE_ORDER" DROP COLUMN "Description",
ADD COLUMN     "Order_File" TEXT,
ADD COLUMN     "Read" BOOLEAN NOT NULL,
ADD COLUMN     "ReadClient" BOOLEAN NOT NULL,
ADD COLUMN     "State" "REQUEST_STATE" NOT NULL;

-- AddForeignKey
ALTER TABLE "INVOICE_ORDER" ADD CONSTRAINT "INVOICE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
