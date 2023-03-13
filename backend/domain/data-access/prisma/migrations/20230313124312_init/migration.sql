/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Satellite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlanetToResource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Satellite" DROP CONSTRAINT "Satellite_planet_id_fkey";

-- DropForeignKey
ALTER TABLE "_PlanetToResource" DROP CONSTRAINT "_PlanetToResource_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlanetToResource" DROP CONSTRAINT "_PlanetToResource_B_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Planet";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "Satellite";

-- DropTable
DROP TABLE "_PlanetToResource";

-- CreateTable
CREATE TABLE "planet" (
    "planet_id" SERIAL NOT NULL,
    "planet_name" TEXT NOT NULL,
    "account_id" INTEGER,
    "radius" DOUBLE PRECISION NOT NULL,
    "semimajor_axis" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "planet_pkey" PRIMARY KEY ("planet_id")
);

-- CreateTable
CREATE TABLE "account" (
    "account_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "resource" (
    "resource_id" SERIAL NOT NULL,
    "resource_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chemical_composition" TEXT NOT NULL,
    "planet_id" INTEGER NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("resource_id")
);

-- CreateTable
CREATE TABLE "satellite" (
    "satellite_id" SERIAL NOT NULL,
    "satellite_name" TEXT NOT NULL,
    "planet_id" INTEGER NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "semimajor_axis" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "satellite_pkey" PRIMARY KEY ("satellite_id")
);

-- CreateTable
CREATE TABLE "_planetToresource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_planetToresource_AB_unique" ON "_planetToresource"("A", "B");

-- CreateIndex
CREATE INDEX "_planetToresource_B_index" ON "_planetToresource"("B");

-- AddForeignKey
ALTER TABLE "planet" ADD CONSTRAINT "planet_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "satellite" ADD CONSTRAINT "satellite_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("planet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_planetToresource" ADD CONSTRAINT "_planetToresource_A_fkey" FOREIGN KEY ("A") REFERENCES "planet"("planet_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_planetToresource" ADD CONSTRAINT "_planetToresource_B_fkey" FOREIGN KEY ("B") REFERENCES "resource"("resource_id") ON DELETE CASCADE ON UPDATE CASCADE;
