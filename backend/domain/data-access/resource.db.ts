import {Resource} from '../model/resource';
import { PrismaClient,resource as PrismaResource } from "@prisma/client";

const prisma = new PrismaClient();
export async function getAllResources(): Promise<Resource[]> {
    const resources: PrismaResource[] = await prisma.resource.findMany();
    return resources.map(resource => Resource.from(<Resource>resource));
}

export async function getAllResourcesOfPlanetWithId(id:number): Promise<Resource[]> {
    const resources: PrismaResource[] = await prisma.resource.findMany({where: {planet_id:  id}});
    return resources.map(resource => Resource.from(<Resource>resource));
}

export async function getResourceWithId(id: number): Promise<Resource> {
    const resource: PrismaResource = await prisma.resource.findUnique({ where: { resource_id: id } });
    return Resource.from(<Resource>resource);
}

export async function addResource(resource: Resource) {
    await prisma.resource.create({
        data: {
            resource_name: resource.resource_name,
            chemical_composition: resource.chemical_composition,
            description: resource.description,
            planet_id: resource.planet_id,
        },
    });
}

export async function editResource(id: number, resource: Resource) {
    await prisma.resource.update({
        where: {resource_id: id},
        data: {
            resource_name: resource.resource_name,
            chemical_composition: resource.chemical_composition,
            description: resource.description,
            planet_id: resource.planet_id,
        },
    });
}

export async function deleteResource(id: number) {
    await prisma.resource.delete({ where: { resource_id: id } });
}
