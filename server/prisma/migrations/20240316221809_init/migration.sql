/*
  Warnings:

  - You are about to drop the column `Discount` on the `PERMISION` table. All the data in the column will be lost.
  - Added the required column `End_Date` to the `PERMISION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Read` to the `PERMISION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReadEmployee` to the `PERMISION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Start_Date` to the `PERMISION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `PERMISION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Read` to the `VACATION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReadEmployee` to the `VACATION` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `VACATION` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "REQUEST_STATE" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- AlterTable
ALTER TABLE "EMPLOYEE" ADD COLUMN     "Days_Spent" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "PERMISION" DROP COLUMN "Discount",
ADD COLUMN     "Answer" TEXT,
ADD COLUMN     "End_Date" TEXT NOT NULL,
ADD COLUMN     "Read" BOOLEAN NOT NULL,
ADD COLUMN     "ReadEmployee" BOOLEAN NOT NULL,
ADD COLUMN     "Start_Date" TEXT NOT NULL,
ADD COLUMN     "State" "REQUEST_STATE" NOT NULL;

-- AlterTable
ALTER TABLE "VACATION" ADD COLUMN     "Answer" TEXT,
ADD COLUMN     "Read" BOOLEAN NOT NULL,
ADD COLUMN     "ReadEmployee" BOOLEAN NOT NULL,
ADD COLUMN     "State" "REQUEST_STATE" NOT NULL,
ALTER COLUMN "Start_Date" SET DATA TYPE TEXT,
ALTER COLUMN "End_Date" SET DATA TYPE TEXT;
