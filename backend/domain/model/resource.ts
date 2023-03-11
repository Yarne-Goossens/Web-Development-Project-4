export class Resource {
    resource_id: Number
    readonly resource_name: String
    readonly chemical_composition: String
    readonly description: String
    planet_id: number

    constructor (resource_name: String, chemical_composition: String, description: String, planet_id: number, resource_id?:number) {
        this.resource_name = resource_name
        this.chemical_composition = chemical_composition
        this.description = description
        this.planet_id = planet_id
        this.resource_id = resource_id
    }

    static create_resource ({resource_name,chemical_composition,description, planet_id}): Resource {
        return new Resource(resource_name,chemical_composition,description,planet_id)
    }

    public getPlanet_id():Number{
        return this.planet_id;
    }

    public setPlanet_id(planet_id:number): void{
        this.planet_id=planet_id;
    }

    public getResource_id():Number{
        return this.resource_id
    }

    public setResource_id(resource_id:number): void{
        this.resource_id=resource_id;
    }
}