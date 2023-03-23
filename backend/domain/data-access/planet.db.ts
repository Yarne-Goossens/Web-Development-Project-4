import { Planet } from '../model/planet';
import { PrismaClient, planet as PrismaPlanet } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPlanets(): Promise<Planet[]> {
    const teams: PrismaPlanet[] = await prisma.planet.findMany();
    return teams.map((team) => Planet.from(<Planet>team));
}

export async function getPlanetWithId(id: number): Promise<Planet> {
    const planet: PrismaPlanet = await prisma.planet.findUnique({ where: { planet_id: id } });
    return Planet.from(<Planet>planet);
}

export async function addPlanet(planet: Planet) {
    await prisma.planet.create({
        data: {
            planet_name: planet.planet_name,
            radius: planet.radius,
            semimajor_axis: planet.semimajor_axis,
            mass: planet.mass,
        },
    });
}

export async function editPlanet(planet_id: number, planet: Planet) {
    await prisma.planet.update({
        where: { planet_id: planet_id },
        data: {
            planet_name: planet.planet_name,
            radius: planet.radius,
            semimajor_axis: planet.semimajor_axis,
            mass: planet.mass,
        },
    });
}

export async function deletePlanet(planet_id: number) {
    await prisma.planet.delete({ where: { planet_id: planet_id } });
}

