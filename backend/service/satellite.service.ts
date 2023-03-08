import { SatelliteDb }  from '../domain/data-access/satellite.db';
import {Satellite} from '../domain/model/satellite';
import {Planet} from '../domain/model/planet';

export class SatelliteService{
    private satelliteDb: SatelliteDb = new SatelliteDb();

    getAllSatellitesService=():Satellite[]=>this.satelliteDb.getAllSatellites();

    getAllSatellitesOfPlanetWithId=(planet_id:number):Planet[]=>this.satelliteDb.getAllSatellitesOfPlanetWithId(planet_id);
    
    getSatelliteWithIdService=(id:number)=>this.satelliteDb.getSatelliteWithId(id);

    addSatellite=(satellite:Satellite)=>this.satelliteDb.addSatellite(satellite);

    deleteSatellite=(id:number)=>this.satelliteDb.deleteSatellite(id);
    editSatelliteService=(id:number,satellite:Satellite)=>this.satelliteDb.editSatellite(id,satellite);
}