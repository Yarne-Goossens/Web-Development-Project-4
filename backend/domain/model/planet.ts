export class Planet {
    
    
    readonly planet_name: String
    readonly planet_id: number
    account_id?: number
    readonly radius: number
    readonly semimajor_axis: number
    readonly mass: number

    constructor(radius: number, semimajor_axis: number, mass: number, planet_name: String,planet_id:number,account_id?:number) {
        this.planet_name = planet_name
        this.radius = radius
        this.semimajor_axis = semimajor_axis
        this.mass = mass
        this.planet_id = planet_id
        this.account_id = account_id
    }
    
    static create_planet({radius, semimajor_axis, mass, planet_name,planet_id,account_id}): Planet {
        return new Planet(radius, semimajor_axis, mass, planet_name,planet_id,account_id)
    }

    /* public getPlanet_id(): number {
        return this.planet_id;
    }

    public setPlanet_id(planet_id: number): void {
        this.planet_id = planet_id;
    } */

    public getAccount_id?(): number {
        return this.account_id;
    }

    public setAccount_id?(account_id: number): void {
        this.account_id = account_id;
    }

    static from(arg0: Planet) {
        return new Planet(arg0.radius, arg0.semimajor_axis, arg0.mass, arg0.planet_name,arg0.planet_id,arg0.account_id)
    }
}