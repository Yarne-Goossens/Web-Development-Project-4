import { PlanetDb }  from '../domain/data-access/planet.db';
import {Planet} from '../domain/model/planet';

export class PlanetService{
    private planetDb: PlanetDb = new PlanetDb();

    getAllPlanetsService=():Planet[]=>this.planetDb.getAllPlanets();

    addPlanetService=(planet:Planet)=>this.planetDb.addPlanet(planet);

    editPlanetService=(id:number,planet:Planet)=>this.planetDb.editPlanet(id,planet);

    deletePlanetService=(id:number)=>this.planetDb.deletePlanet(id);

    getPlanetWithIdService=(id:number)=>this.planetDb.getPlanetWithId(id);
}