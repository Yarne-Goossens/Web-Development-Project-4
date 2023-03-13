import {Planet} from '../model/planet';
import { PrismaClient,planet as PrismaPlanet } from "@prisma/client";
import { mapToPlanet } from './prisma/planet.mapper';
    
export class PlanetDb{
    private id:number=0;
    planets: Planet[] =[];

    constructor(){
        this.addPlanetOld(Planet.create_planet({ radius:69911 ,semimajor_axis: 778412010,mass:1.8986*Math.pow(10,27), planet_name:'Jupiter'})),
        this.addPlanetOld(Planet.create_planet({ radius: 6371, semimajor_axis: 149598023, mass: 5.972168*Math.pow(10,24), planet_name: 'Earth'})),
        this.addPlanetOld(Planet.create_planet({ radius: 1830, semimajor_axis: 227939366, mass: 6.4171*Math.pow(10,23), planet_name: 'Mars'}))
    }

    public addPlanetOld=(planet:Planet)=>{
        const planeet=Planet.create_planet(planet)
        //planeet.setPlanet_id(this.id);
        this.planets.push(planeet);
        this.id++;
    }

    

    public editPlanet=(id:number,planet:Planet)=>{
        for(let plnt of this.planets){
            /* if(plnt.getPlanet_id()==id){
                let index=this.planets.indexOf(plnt);
                this.planets[index]=planet;
            } */
        }
    }

    public deletePlanet=(id:number)=>{
        for(let planet of this.planets){
           /*  if(planet.getPlanet_id()==id){
                this.planets.splice(this.planets.indexOf(planet),1);
            } */
        }
    }

    public getAllPlanets=():Planet[]=>{  
        return this.planets;
    }

    public getPlanetWithId=(id:number):Planet=>{
        
        for(let planet of this.planets){
           /*  if(planet.getPlanet_id()==id){
                return planet;
            } */
        }   
        return null;
    }

}

const prisma = new PrismaClient();
export async function getAllPlanets(): Promise<Planet[]> {
    const teams: PrismaPlanet[] = await prisma.planet.findMany();

    return teams.map(team => Planet.from(<Planet>team));
}