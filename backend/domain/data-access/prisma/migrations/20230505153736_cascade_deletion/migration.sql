-- DropForeignKey
ALTER TABLE "satellite" DROP CONSTRAINT "satellite_planet_id_fkey";

-- AddForeignKey
ALTER TABLE "satellite" ADD CONSTRAINT "satellite_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("planet_id") ON DELETE CASCADE ON UPDATE CASCADE;
