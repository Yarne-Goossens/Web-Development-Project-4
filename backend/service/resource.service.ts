import { ResourceDb }  from '../domain/data-access/resource.db';
import {Resource} from '../domain/model/resource';

export class ResourceService{
    private resourceDb: ResourceDb = new ResourceDb();

    getAllResources=():Resource[]=>this.resourceDb.getAllResources();
}