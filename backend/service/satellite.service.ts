import { getAllSatellites, getAllSatellitesOfPlanetWithId, getSatelliteWithId, addSatellite, editSatellite, deleteSatellite }  from '../domain/data-access/satellite.db';
import {Satellite} from '../domain/model/satellite';

export class SatelliteService{
    getAllSatellitesService=async():Promise<Satellite[]>=>await getAllSatellites();

    getAllSatellitesOfPlanetWithId=async(planet_id:number):Promise<Satellite[]>=>await getAllSatellitesOfPlanetWithId(planet_id);
    
    getSatelliteWithIdService=async(id:number)=>await getSatelliteWithId(id);

    addSatellite=async(satellite:Satellite)=>await addSatellite(satellite);

    editSatelliteService=async(id:number,satellite:Satellite)=>await editSatellite(id,satellite);

    deleteSatellite=async(id:number)=>await deleteSatellite(id);
}