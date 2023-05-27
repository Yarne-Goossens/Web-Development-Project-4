import {Satellite} from '../model/satellite';
import { PrismaClient,satellite as PrismaSatellite } from "@prisma/client";

const prisma = new PrismaClient();
export async function getAllSatellites(): Promise<Satellite[]> {
    const satellites: PrismaSatellite[] = await prisma.satellite.findMany();
    return satellites.map(satellite => Satellite.from(<Satellite>satellite));
}

export async function getAllSatellitesOfPlanetWithId(id:number): Promise<Satellite[]> {
    const satellites: PrismaSatellite[] = await prisma.satellite.findMany({where: {planet_id:  id}});
    return satellites.map(satellite => Satellite.from(<Satellite>satellite));
}

export async function getSatelliteWithId(id: number): Promise<Satellite> {
    const satellite: PrismaSatellite = await prisma.satellite.findUnique({ where: { satellite_id: id } });
    return Satellite.from(<Satellite>satellite);
}

export async function addSatellite(satellite: Satellite) {
    await prisma.satellite.create({
        data: {
            satellite_name: satellite.satellite_name,
            radius: satellite.radius,
            semimajor_axis: satellite.semimajor_axis,
            mass: satellite.mass,
            planet: {
                connect: {
                    planet_id: satellite.planet_id 
                }
              }
        },
    });
}

export async function editSatellite(id: number, satellite: Satellite) {
    await prisma.satellite.update({
        where: {satellite_id: id},
        data: {
            satellite_name: satellite.satellite_name,
            radius: satellite.radius,
            semimajor_axis: satellite.semimajor_axis,
            mass: satellite.mass,
            planet_id: satellite.planet_id
        },
    });
}

export async function deleteSatellite(id: number) {
    await prisma.satellite.delete({ where: { satellite_id: id } });
}

export async function idExists(id: number): Promise<boolean> {
    const satellite: PrismaSatellite = await prisma.satellite.findUnique({ where: { satellite_id: id } });
    return satellite != null;
}

export async function satelliteNameExists(name: string): Promise<boolean> {
    const satellite: PrismaSatellite[] = await prisma.satellite.findMany({ where: { satellite_name: name } });
    return satellite != null;
}

export async function satelliteNameExistsExceptSameSatellite(id:number,name: string): Promise<boolean> {
    const satellite: PrismaSatellite = await prisma.satellite.findFirst({ where: { satellite_name: name,satellite_id:{not:id} } });
    return !!satellite;
}

export async function buySatellite(sat_id: number,account_id:number) {
    await prisma.account.update({
        where: { account_id: account_id },
        data: {
            satellites: {
                connect: {
                    satellite_id: sat_id
                }
            }
        }
    });}

export async function sellSatellite(sat_id: number,account_id:number) {
    await prisma.account.update({
        where: { account_id: account_id },
        data: {
            satellites: {
                disconnect: {
                    satellite_id: sat_id
                }
            }
        }
    });}