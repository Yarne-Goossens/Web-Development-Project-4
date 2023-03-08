export class Satellite {
    satellite_id?: number
    readonly radius: number
    readonly semimajor_axis: number
    readonly mass: number
    readonly satellite_name: String
    planet_id: number

    constructor(radius: number, semimajor_axis: number, mass: number, satellite_name: String, planet_id: number, satellite_id?: number) {
        this.satellite_id = satellite_id
        this.radius = radius
        this.semimajor_axis = semimajor_axis
        this.mass = mass
        this.satellite_name = satellite_name
        this.planet_id = planet_id
    }

    static create_satellite({radius, semimajor_axis, mass, satellite_name, planet_id}) {
        return new Satellite(radius, semimajor_axis, mass, satellite_name, planet_id);
    }

    public getSatellite_id?(): number {
        return this.satellite_id;
    }

    public setSatellite_id?(satellite_id: number): void {
        this.satellite_id = satellite_id;
    }

    public getPlanet_id(): number {
        return this.planet_id;
    }

    public setPlanet_id(planet_id: number): void {
        this.planet_id = planet_id;
    }
}