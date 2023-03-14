import {Planet} from '../domain/model/planet';
import {getAllPlanets} from '../domain/data-access/planet.db';  
import { addPlanet } from '../domain/data-access/planet.db'; 
import {getPlanetWithId} from '../domain/data-access/planet.db';
import {editPlanet} from '../domain/data-access/planet.db';
import {deletePlanet} from '../domain/data-access/planet.db';

export class PlanetService{
    addPlanetService=async(planet:Planet)=>await addPlanet(planet);

    editPlanetService=async(id:number,planet:Planet)=>await editPlanet(id,planet);

    deletePlanetService=async(id:number)=>await deletePlanet(id);

    getPlanetWithIdService=async(id:number):Promise<Planet>=>await getPlanetWithId(id);

    getAllPlanetsService=async():Promise<Planet[]>=>await getAllPlanets();
}