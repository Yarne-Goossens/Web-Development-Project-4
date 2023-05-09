
import { getAllSatellites, getAllSatellitesOfPlanetWithId, 
    getSatelliteWithId, addSatellite, editSatellite, deleteSatellite, 
    satelliteNameExists, idExists,buySatellite,sellSatellite }  from '../domain/data-access/satellite.db';
import {Satellite} from '../domain/model/satellite';

export class SatelliteService{
    getAllSatellitesService=async():Promise<Satellite[]>=>await getAllSatellites();

    getAllSatellitesOfPlanetWithId=async(planet_id:number):Promise<Satellite[]>=>await getAllSatellitesOfPlanetWithId(planet_id);
    
    getSatelliteWithIdService=async(id:number):Promise<Satellite>=>await getSatelliteWithId(id);

    addSatellite=async(satellite:Satellite)=>await addSatellite(satellite);

    editSatelliteService=async(id:number,satellite:Satellite)=>await editSatellite(id,satellite);

    deleteSatellite=async(id:number)=>{
        if(await idExists(id)==false){throw new Error('Satellite does not exist');}
        await deleteSatellite(id);
    }

    idExistsService=async(id:number):Promise<boolean>=>await idExists(id);

    

    satelliteNameExistsService=async(name:string):Promise<boolean>=>await satelliteNameExists(name);

    buySatelliteService=async(sat_id:number,account_id:number)=>await buySatellite(sat_id,account_id);

    sellSatelliteService=async(sat_id:number,account_id:number)=>await sellSatellite(sat_id,account_id);

}