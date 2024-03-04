-- CreateEnum
CREATE TYPE "APPOINTMENT_SOLICITATION_STATE" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "INVENTORY_MOVEMENT_TYPE" AS ENUM ('ENTRADA', 'SALIDA');

-- CreateTable
CREATE TABLE "APPOINTMENT_SOLICITATION" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Client_Fk" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "State" "APPOINTMENT_SOLICITATION_STATE" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APPOINTMENT_SOLICITATION_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "INVENTORY_MOVEMENT" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "State" "INVENTORY_MOVEMENT_TYPE" NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INVENTORY_MOVEMENT_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "APPOINTMENT_SOLICITATION" ADD CONSTRAINT "APPOINTMENT_SOLICITATION_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES "CLIENT"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
