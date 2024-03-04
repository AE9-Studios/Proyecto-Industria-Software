/*
  Warnings:

  - Changed the type of `State` on the `APPOINTMENT` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "APPOINTMENT_STATE" AS ENUM ('PENDIENTE', 'ATENDIDO');

-- AlterTable
ALTER TABLE "APPOINTMENT" DROP COLUMN "State",
ADD COLUMN     "State" "APPOINTMENT_STATE" NOT NULL;
