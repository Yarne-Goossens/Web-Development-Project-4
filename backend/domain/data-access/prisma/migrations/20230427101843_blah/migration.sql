/*
  Warnings:

  - You are about to drop the `PlanetToResource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlanetToResource" DROP CONSTRAINT "PlanetToResource_planet_id_fkey";

-- DropForeignKey
ALTER TABLE "PlanetToResource" DROP CONSTRAINT "PlanetToResource_resource_id_fkey";

-- DropTable
DROP TABLE "PlanetToResource";

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
ALTER TABLE "_planetToresource" ADD CONSTRAINT "_planetToresource_A_fkey" FOREIGN KEY ("A") REFERENCES "planet"("planet_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_planetToresource" ADD CONSTRAINT "_planetToresource_B_fkey" FOREIGN KEY ("B") REFERENCES "resource"("resource_id") ON DELETE CASCADE ON UPDATE CASCADE;
