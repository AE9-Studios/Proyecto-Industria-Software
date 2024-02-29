-- CreateTable
CREATE TABLE "ACTIVITY_LOG" (
    "Id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ACTIVITY_LOG_pkey" PRIMARY KEY ("Id")
);
