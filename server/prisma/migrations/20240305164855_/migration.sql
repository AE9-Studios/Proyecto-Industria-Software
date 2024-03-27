/*
  Warnings:

  - You are about to drop the column `Phone` on the `EMPLOYEE` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `PERMISION` table. All the data in the column will be lost.
  - You are about to drop the column `End_Date` on the `SCHEDULE` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Date` on the `SCHEDULE` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SCHEDULE_EMPLOYEE` table. All the data in the column will be lost.
  - Added the required column `Schedule` to the `SCHEDULE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ScheduleName` to the `SCHEDULE` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EMPLOYEE_STATE" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "EMPLOYEE" DROP COLUMN "Phone",
ADD COLUMN     "State" "EMPLOYEE_STATE" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "PERMISION" DROP COLUMN "Role";

-- AlterTable
ALTER TABLE "SCHEDULE" DROP COLUMN "End_Date",
DROP COLUMN "Start_Date",
ADD COLUMN     "Schedule" JSONB NOT NULL,
ADD COLUMN     "ScheduleName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SCHEDULE_EMPLOYEE" DROP COLUMN "description";
