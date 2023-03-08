export class Planet {
    
    readonly planet_name: String
    planet_id: number
    account_id?: number
    readonly webshop_name: String
    readonly radius: number
    readonly semimajor_axis: number
    readonly mass: number

    constructor(webshop_name: String, radius: number, semimajor_axis: number, mass: number, planet_name: String,planet_id?:number) {
        this.planet_name = planet_name
        this.radius = radius
        this.semimajor_axis = semimajor_axis
        this.mass = mass
        this.webshop_name = webshop_name
        this.planet_id = planet_id
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

    public getAccount_id?(): number {
        return this.account_id;
    }

    public setAccount_id?(account_id: number): void {
        this.account_id = account_id;
    }
}