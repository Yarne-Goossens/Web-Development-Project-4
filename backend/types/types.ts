import { Satellite } from "../domain/model/satellite";
import { Resource } from "../domain/model/resource";
import { Planet } from "../domain/model/planet";

export type PlanetMap = {
        semimajor_axis?: number,
        mass?: number,
        planet_name?: string,
        planet_id?: number,
        account_id?: number,
        satellites?: Satellite[]
        resources?: Resource[]
}

export type SatelliteMap = {
     satellite_id: number
     radius: number
     semimajor_axis: number
     mass: number
     satellite_name: string
     planet_id: number
}

export type ResourceMap = {
        resource_id: number
        resource_name: string
        planet_id: number
        planets: Planet[]
        description: string
}