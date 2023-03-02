export class Planet {
    readonly planet_id: number
    readonly account_id?: number
    readonly webshop_name?: String
    readonly radius: number
    readonly semimajor_axis: bigint
    readonly mass: bigint
    readonly planet_name: String

    constructor(planet_id: number, webshop_name: String, radius: number, semimajor_axis: bigint, mass: bigint, planet_name: String) {
        this.planet_id = planet_id
        this.webshop_name = webshop_name
        this.radius = radius
        this.semimajor_axis = semimajor_axis
        this.mass = mass
        this.planet_name = planet_name
    }

    static create_planet({planet_id, webshop_name, radius, semimajor_axis, mass, planet_name}) {
        return new Planet( planet_id,webshop_name, radius, semimajor_axis, mass, planet_name)
    }
}