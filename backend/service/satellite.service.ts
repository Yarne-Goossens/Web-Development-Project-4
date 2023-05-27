
import { getAllSatellites, getAllSatellitesOfPlanetWithId, 
    getSatelliteWithId, addSatellite, editSatellite, deleteSatellite, 
    satelliteNameExists, idExists,buySatellite,sellSatellite, satelliteNameExistsExceptSameSatellite }  from '../domain/data-access/satellite.db';
import {Satellite} from '../domain/model/satellite';

export class SatelliteService{
    getAllSatellitesService=async():Promise<Satellite[]>=>await getAllSatellites();

    getAllSatellitesOfPlanetWithId=async(planet_id:number):Promise<Satellite[]>=>await getAllSatellitesOfPlanetWithId(planet_id);
    
    getSatelliteWithIdService=async(id:number):Promise<Satellite>=>await getSatelliteWithId(id);

    addSatellite=async(satellite:Satellite)=>{
        const radius=satellite.radius;const semimajor_axis=satellite.semimajor_axis;const mass=satellite.mass;const satellite_name=satellite.satellite_name.trim();const planet_id=satellite.planet_id;

        if(await satelliteNameExists(satellite_name)===true){throw new Error('Satellite name already exists');}
        if(radius<0||radius==null){throw new Error('Radius cannot be negative');}
        if(semimajor_axis<0||semimajor_axis==null){throw new Error('Semimajor axis cannot be negative');}
        if(mass<0||mass==null){throw new Error('Mass cannot be negative');}
        if(satellite_name==null){throw new Error('Satellite name cannot be null');}
        if(planet_id==null){throw new Error('Planet id cannot be null');}
        
        await addSatellite(satellite);
    }

    editSatelliteService=async(id:number,satellite:Satellite)=>{
        const radius=satellite.radius;const semimajor_axis=satellite.semimajor_axis;const mass=satellite.mass;const satellite_name=satellite.satellite_name.trim();const planet_id=satellite.planet_id;

        if(await idExists(id)==false){throw new Error('Satellite does not exist');}
        if(await satelliteNameExistsExceptSameSatellite(id,satellite_name)===true){throw new Error('Satellite name already exists');}
        if(radius<0||radius==null){throw new Error('Radius cannot be negative');}
        if(semimajor_axis<0||semimajor_axis==null){throw new Error('Semimajor axis cannot be negative');}
        if(mass<0||mass==null){throw new Error('Mass cannot be negative');}
        if(satellite_name==null){throw new Error('Satellite name cannot be null');}
        if(planet_id==null){throw new Error('Planet id cannot be null');}
        
        await editSatellite(id,satellite);
    }

    deleteSatellite=async(id:number)=>{
        if(await idExists(id)==false){throw new Error('Satellite does not exist');}
        await deleteSatellite(id);
    }

    idExistsService=async(id:number):Promise<boolean>=>await idExists(id);

    

    satelliteNameExistsService=async(name:string):Promise<boolean>=>await satelliteNameExists(name);

    buySatelliteService=async(sat_id:number,account_id:number)=>await buySatellite(sat_id,account_id);

    sellSatelliteService=async(sat_id:number,account_id:number)=>await sellSatellite(sat_id,account_id);

}