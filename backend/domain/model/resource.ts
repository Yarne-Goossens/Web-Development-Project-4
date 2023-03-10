export class Resource {
    readonly resource_name: String
    readonly chemical_composition?: String
    readonly description: String
    planet_ids?: number[]

    constructor (resource_name: String, chemical_composition: String, description: String, planet_ids?: number[]) {
        this.resource_name = resource_name
        this.chemical_composition = chemical_composition
        this.description = description
        this.planet_ids = planet_ids
    }

    static create_resource (resource: Resource): Resource {
        return new Resource(resource.resource_name, resource.chemical_composition, resource.description)
    }

   /*  public add_resource_to_planet ( planet_id: number) {
        this.planet_ids.push(planet_id)
    }
 */
   
}