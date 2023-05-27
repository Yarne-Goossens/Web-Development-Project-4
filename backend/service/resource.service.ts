
import { getAllResources, getAllResourcesOfPlanetWithId, getResourceWithId, addResource, editResource, deleteResource,idExists }  from '../domain/data-access/resource.db';
import {Resource} from '../domain/model/resource';

export class ResourceService{
    getAllResourceService=async():Promise<Resource[]>=>await getAllResources();

    getAllResourceOfPlanetWithId=async(planet_id:number):Promise<Resource[]>=>await getAllResourcesOfPlanetWithId(planet_id);
    
    getResourceWithIdService=async(id:number):Promise<Resource>=>await getResourceWithId(id);

    addResource=async(resource:Resource)=>{
        const resource_name=resource.resource_name;const chemical_composition=resource.chemical_composition;const description=resource.description;const planet_id=resource.planet_id;

        if(resource_name==null||resource_name.length<1||resource_name.length>30){throw new Error('Resource name must be between 1 and 30 characters');}
        if(chemical_composition==null||chemical_composition.length<1||chemical_composition.length>30){throw new Error('Chemical composition must be between 1 and 30 characters');}
        if(description==null||description.length<1||description.length>255){throw new Error('Description must be between 1 and 255 characters');}
        if(planet_id==null||planet_id<0){throw new Error('Planet id must be a number');}

        await addResource(resource);}

    editResourceService=async(id:number,resource:Resource)=>{
    const resource_name=resource.resource_name;const chemical_composition=resource.chemical_composition;const description=resource.description;const planet_id=resource.planet_id;

        if(resource_name==null||resource_name.length<1||resource_name.length>30){throw new Error('Resource name must be between 1 and 30 characters');}
        if(chemical_composition==null||chemical_composition.length<1||chemical_composition.length>30){throw new Error('Chemical composition must be between 1 and 30 characters');}
        if(description==null||description.length<1||description.length>255){throw new Error('Description must be between 1 and 255 characters');}
        if(planet_id==null||planet_id<0){throw new Error('Planet id must be a number');}
        if(await idExists(id)==false){throw new Error('Resource not found');}

        await editResource(id,resource);
    }

    deleteResource=async(id:number)=>{
        if(await idExists(id)==false){throw new Error('Resource does not exist');}

        await deleteResource(id);
    }

    idExistsService=async(id:number)=>await idExists(id);
}