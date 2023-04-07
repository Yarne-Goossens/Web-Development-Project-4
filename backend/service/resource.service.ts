
import { getAllResources, getAllResourcesOfPlanetWithId, getResourceWithId, addResource, editResource, deleteResource,idExists }  from '../domain/data-access/resource.db';
import {Resource} from '../domain/model/resource';

export class ResourceService{
    getAllResourceService=async():Promise<Resource[]>=>await getAllResources();

    getAllResourceOfPlanetWithId=async(planet_id:number):Promise<Resource[]>=>await getAllResourcesOfPlanetWithId(planet_id);
    
    getResourceWithIdService=async(id:number):Promise<Resource>=>await getResourceWithId(id);

    addResource=async(resource:Resource)=>await addResource(resource);

    editResourceService=async(id:number,resource:Resource)=>await editResource(id,resource);

    deleteResource=async(id:number)=>await deleteResource(id);

    idExistsService=async(id:number)=>await idExists(id);
}