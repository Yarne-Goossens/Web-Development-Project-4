import { Resource } from '../model/resource';

export class ResourceDb{
    private id:number=0;
    satellites: Resource[] =[];

    constructor(){
        this.addResource(Resource.create_resource({resource_name:"Ijzer" ,chemical_composition: "Fe",description:"balls"}))
    }

    public addResource=(resource:Resource)=>{
        //const sat=Resource.create_resource(resource)
        this.satellites.push(resource);
    }

    public getAllResources=():Resource[]=>{  
        return this.satellites;
    }

    

   


}