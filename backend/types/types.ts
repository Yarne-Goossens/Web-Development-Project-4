import { Satellite } from "../domain/model/satellite";
export type PlanetMap = {
        semimajor_axis?: number,
        mass?: number,
        planet_name?: string,
        planet_id?: number,
        account_id?: number,
        satellites?: Satellite[]
}

export type SatelliteMap = {
     satellite_id: number
     radius: number
     semimajor_axis: number
     mass: number
     satellite_name: string
     planet_id: number
}