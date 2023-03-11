import { Resource } from '../model/resource';

export class ResourceDb{
    private id:number=0;
    resources: Resource[] =[];

    constructor(){
        this.addResource(Resource.create_resource({resource_name:"Ijzer" ,chemical_composition: "Fe",description:"balls", planet_id: "1"}))
    }

    public addResource=(resource:Resource)=>{
        const res=Resource.create_resource(resource)
        
        res.setResource_id(this.id);
        this.resources.push(res);
        this.id++;
    }

    public getAllResources=():Resource[]=>{  
        return this.resources;
    }

    public getResourceWithId=(id:number):Resource=>{
        for(let res of this.resources){
            if(res.getResource_id()==id){
                return res;
            }
        }   
        return null;
    }

    public deleteResource=(id:number)=>{
        for(let res of this.resources){
            if(res.getResource_id()==id){
                this.resources.splice(this.resources.indexOf(res),1);
            }   
        }
    }

    public editResource=(id:number,resource:Resource)=>{
        for(let res of this.resources){
            if(res.getResource_id()==id){
                let index=this.resources.indexOf(res);
                this.resources[index]=resource;
            }
        }   
    }
}