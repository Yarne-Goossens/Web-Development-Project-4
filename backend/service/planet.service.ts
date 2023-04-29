import {Planet} from '../domain/model/planet';
import { idExists, planetNameExists, planetNameExistsExceptSamePlanet,getAllPlanets} from '../domain/data-access/planet.db';  
import { addPlanet } from '../domain/data-access/planet.db'; 
import {editPlanet} from '../domain/data-access/planet.db';
import {deletePlanet,buyPlanet,sellPlanet} from '../domain/data-access/planet.db';
import { idExists as accountIdExists } from '../domain/data-access/account.db';
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

    editPlanetService=async(id:number,planet:Planet)=>{
        const radius=planet.radius;const semimajor_axis=planet.semimajor_axis;const mass=planet.mass;const planet_name=planet.planet_name.trim();

        if(await idExists(id)==false){throw new Error('Planet does not exist');}
        if(planet_name==null||planet_name.length<1||planet_name.length>30){throw new Error('Planet name must be between 1 and 30 characters.');}
        if(radius==null||radius<0){throw new Error('Radius must be greater than 0');}
        if(semimajor_axis==null||semimajor_axis<0){throw new Error('Semimajor axis must be greater than 0');}
        if(mass==null||mass<0){throw new Error('Mass must be greater than 0');}
        if(await planetNameExistsExceptSamePlanet(id,planet_name)){throw new Error('Planet name already exists');}

        await editPlanet(id,planet);
    }

    deletePlanetService=async(id:number)=>{
        if(await idExists(id)==false){throw new Error('Planet does not exist');}

        await deletePlanet(id);
    }

    getAllPlanetsService=async()=>{
        return await getAllPlanets();
    }

    idExistsService=async(id:number)=>{
        return await idExists(id);
    }

    buyPlanetService=async(planet_id:number,account_id:number)=>{
        if(await idExists(planet_id)==false){throw new Error('Planet does not exist');}
        if(await accountIdExists(account_id)==false){throw new Error('Account does not exist');}
        await buyPlanet(planet_id,account_id);
    }

    sellPlanetService=async(planet_id:number,account_id:number)=>{
        if(await idExists(planet_id)==false){throw new Error('Planet does not exist');}
        if(await accountIdExists(account_id)==false){throw new Error('Account does not exist');}
        await sellPlanet(planet_id,account_id);
    }
}