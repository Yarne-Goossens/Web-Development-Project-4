import {Planet} from '../model/planet';

    const planets: Planet[] =[
        Planet.createPlanet({planet_id: 1, webshop_name: 'webshop1', radius: 1, semimajor_axis: 1, mass: 1, planet_name: 'planet1'}),
        Planet.createPlanet({planet_id: 2, webshop_name: 'webshop2', radius: 2, semimajor_axis: 2, mass: 2, planet_name: 'planet2'}),
    ];

    export const getAllPlanets=():Planet[]=>{  
        return planets;
    }

 