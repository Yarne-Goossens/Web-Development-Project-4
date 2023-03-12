-- CreateTable
CREATE TABLE "Planet" (
    "planet_id" SERIAL NOT NULL,
    "planet_name" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "semimajor_axis" BIGINT NOT NULL,
    "mass" BIGINT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("planet_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "resource_id" SERIAL NOT NULL,
    "resource_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chemical_composition" TEXT NOT NULL,
    "planet_id" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("resource_id")
);

-- CreateTable
CREATE TABLE "Satellite" (
    "satellite_id" SERIAL NOT NULL,
    "satellite_name" TEXT NOT NULL,
    "planet_id" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "semimajor_axis" BIGINT NOT NULL,
    "mass" BIGINT NOT NULL,

    CONSTRAINT "Satellite_pkey" PRIMARY KEY ("satellite_id")
);

-- CreateTable
CREATE TABLE "_PlanetToResource" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlanetToResource_AB_unique" ON "_PlanetToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanetToResource_B_index" ON "_PlanetToResource"("B");

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "Planet"("planet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanetToResource" ADD CONSTRAINT "_PlanetToResource_A_fkey" FOREIGN KEY ("A") REFERENCES "Planet"("planet_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanetToResource" ADD CONSTRAINT "_PlanetToResource_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("resource_id") ON DELETE CASCADE ON UPDATE CASCADE;
