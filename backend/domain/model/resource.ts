export class Resource {
    resource_id?: number
    readonly resource_name: string
    readonly chemical_composition: string
    readonly description: string
    planet_id: number

    constructor (resource_name: string, chemical_composition: string, description: string, planet_id: number, resource_id?:number) {
        this.resource_name = resource_name
        this.chemical_composition = chemical_composition
        this.description = description
        this.planet_id = planet_id
        this.resource_id = resource_id
    }

    static create_resource ({resource_name,chemical_composition,description, planet_id}) {
        return new Resource(resource_name,chemical_composition,description,planet_id)
    }

    public getResource_id?(): number {
        return this.resource_id;
    }

    public setResource_id?(resource_id: number): void {
        this.resource_id = resource_id;
    }

    static from(arg0: Resource) {
        return new Resource(arg0.resource_name, arg0.chemical_composition, arg0.description, arg0.planet_id, arg0.resource_id)
    }
}