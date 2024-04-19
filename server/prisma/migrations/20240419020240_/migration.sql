/*
  Warnings:

  - You are about to drop the column `created_At` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `USER` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "POSITIONS" ADD VALUE 'RECEPCION';

-- AlterTable
ALTER TABLE "PRODUCT" ADD COLUMN     "Image" TEXT;

-- AlterTable
ALTER TABLE "USER" DROP COLUMN "created_At",
DROP COLUMN "updated_At",
ADD COLUMN     "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Updated_At" TIMESTAMP(3);
