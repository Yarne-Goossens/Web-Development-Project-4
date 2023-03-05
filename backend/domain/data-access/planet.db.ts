import {Planet} from '../model/planet';
    
export class PlanetDb{
    private id:number=0;
    planets: Planet[] =[];

    constructor(){
        this.addPlanet(Planet.create_planet({ webshop_name: 'Zonnestelsel', radius:69911 ,semimajor_axis: 778412010,mass:1.8986*Math.pow(10,27), planet_name:'Jupiter'})),
        this.addPlanet(Planet.create_planet({ webshop_name: 'Zonnestelsel', radius: 6371, semimajor_axis: 149598023, mass: 5.972168*Math.pow(10,24), planet_name: 'Earth'})),
        this.addPlanet(Planet.create_planet({ webshop_name: 'Zonnestelsel', radius: 1830, semimajor_axis: 227939366, mass: 6.4171*Math.pow(10,23), planet_name: 'Mars'}))
    }

    public addPlanet=(planet:Planet)=>{
        this.id++;
        planet.setPlanet_id(this.id);
        this.planets.push(planet);
    }

    public getAllPlanets=():Planet[]=>{  
        return this.planets;
    }

}