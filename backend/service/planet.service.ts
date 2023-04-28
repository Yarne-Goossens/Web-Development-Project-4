import {Planet} from '../domain/model/planet';
import {getAllPlanets, idExists, planetNameExists} from '../domain/data-access/planet.db';  
import { addPlanet } from '../domain/data-access/planet.db'; 
import {getPlanetWithId} from '../domain/data-access/planet.db';
import {editPlanet} from '../domain/data-access/planet.db';
import {deletePlanet,buyPlanet,sellPlanet} from '../domain/data-access/planet.db';

export class PlanetService{
    addPlanetService=async(planet:Planet)=>{
        
        const radius=planet.radius;const semimajor_axis=planet.semimajor_axis;const mass=planet.mass;const planet_name=planet.planet_name.trim();

        if(planet_name==null||planet_name.length<1||planet_name.length>30){throw new Error('Planet name must be between 1 and 30 characters.');}
        if(radius==null||radius<0){throw new Error('Radius must be greater than 0');}
        if(semimajor_axis==null||semimajor_axis<0){throw new Error('Semimajor axis must be greater than 0');}
        if(mass==null||mass<0){throw new Error('Mass must be greater than 0');}
        if(await planetNameExists(planet_name)){throw new Error('Planet name already exists');}

        await addPlanet(planet);
    }

    editPlanetService=async(id:number,planet:Planet)=>await editPlanet(id,planet);

    deletePlanetService=async(id:number)=>await deletePlanet(id);

    getPlanetWithIdService=async(id:number):Promise<Planet>=>await getPlanetWithId(id);

    getAllPlanetsService=async():Promise<Planet[]>=>await getAllPlanets();

    idExistsService=async(id:number):Promise<boolean>=>await idExists(id);

    planetNameExistsService=async(name:string):Promise<boolean>=>await planetNameExists(name);

    buyPlanetService=async(planet_id:number,account_id:number)=>await buyPlanet(planet_id,account_id);

    sellPlanetService=async(planet_id:number,account_id:number)=>await sellPlanet(planet_id,account_id);
}