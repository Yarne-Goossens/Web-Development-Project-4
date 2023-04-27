/*
  Warnings:

  - You are about to drop the `_planetToresource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_planetToresource" DROP CONSTRAINT "_planetToresource_A_fkey";

-- DropForeignKey
ALTER TABLE "_planetToresource" DROP CONSTRAINT "_planetToresource_B_fkey";

-- DropTable
DROP TABLE "_planetToresource";

-- CreateTable
CREATE TABLE "PlanetToResource" (
    "planet_id" INTEGER NOT NULL,
    "resource_id" INTEGER NOT NULL,

    CONSTRAINT "PlanetToResource_pkey" PRIMARY KEY ("planet_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "PlanetToResource" ADD CONSTRAINT "PlanetToResource_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("planet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanetToResource" ADD CONSTRAINT "PlanetToResource_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("resource_id") ON DELETE RESTRICT ON UPDATE CASCADE;
