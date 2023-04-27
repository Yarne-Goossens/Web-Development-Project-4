import { Planet } from '../model/planet';
import { PrismaClient, planet as PrismaPlanet } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllPlanets(): Promise<Planet[]> {
    const planets: PrismaPlanet[] = await prisma.planet.findMany({
            include: {
                
                satellites: true,resources: true,
        }
    }
    );
    var res=planets.map((planet) => Planet.from(<Planet>planet));
    console.log(res);
    return res;
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

export async function idExists(id: number): Promise<boolean> {
    const planet: PrismaPlanet = await prisma.planet.findUnique({ where: { planet_id: id } });
    return !!planet;
}

export async function planetNameExists(name: string): Promise<boolean> {
    const planet: PrismaPlanet = await prisma.planet.findFirst({ where: { planet_name: name } });
    return !!planet;
}

export async function buyPlanet(planet_id: number,account_id:number) {
    await prisma.account.update({
        where: { account_id: account_id },
        data: {
            planets: {
                connect: {
                    planet_id: planet_id
                }
            }
        }
    });}

export async function sellPlanet(account_id:number,planet_id: number) {
    await prisma.account.update({
        where: { account_id: account_id },
        data: {
            planets: {
                disconnect: {
                    planet_id: planet_id
                }
            }
        }
    });}

export default{

}