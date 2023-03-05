export class Planet {
    
    readonly planet_name: String
    planet_id: number
    readonly account_id?: number
    readonly webshop_name?: String
    readonly radius: number
    readonly semimajor_axis: bigint
    readonly mass: bigint

    constructor( webshop_name: String, radius: number, semimajor_axis: bigint, mass: bigint, planet_name: String) {
        
        this.planet_name = planet_name
        this.radius = radius
        this.semimajor_axis = semimajor_axis
        this.mass = mass
        this.webshop_name = webshop_name
    }

    static create_planet({webshop_name, radius, semimajor_axis, mass, planet_name}) {
        return new Planet(webshop_name, radius, semimajor_axis, mass, planet_name)
    }

    public getPlanet_id(): number {
        return this.planet_id;
    }

    public setPlanet_id(planet_id: number): void {
        this.planet_id = planet_id;
    }
}