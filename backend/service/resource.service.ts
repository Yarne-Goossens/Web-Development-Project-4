import { ResourceDb }  from '../domain/data-access/resource.db';
import {Resource} from '../domain/model/resource';

export class ResourceService{
    private resourceDb: ResourceDb = new ResourceDb();

    getAllResources=():Resource[]=>this.resourceDb.getAllResources();
    addResource=(resource:Resource)=>this.resourceDb.addResource(resource);
    getResourceWithIdService=(id:number)=>this.resourceDb.getResourceWithId(id);

    deleteResource=(id:number)=>this.resourceDb.deleteResource(id);
    editResourceService=(id:number,resource:Resource)=>this.resourceDb.editResource(id,resource);
}