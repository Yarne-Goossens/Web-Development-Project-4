export class Satellite {
    private _satellite_id: number
    private _radius: number
    private _semimajor_axis: number
    private _mass: number
    private _satellite_name: string
    private _planet_id: number

    constructor(radius?: number, semimajor_axis?: number, mass?: number, satellite_name?: string, planet_id?: number, satellite_id?: number) {
        this._satellite_id = satellite_id
        this._radius = radius
        this._semimajor_axis = semimajor_axis
        this._mass = mass
        this._satellite_name = satellite_name
        this._planet_id = planet_id
    }

    get satellite_id(): number{
        return this._satellite_id;
    }
    get radius(): number{
        return this._radius;
    }
    get semimajor_axis(): number{
        return this._semimajor_axis;
    }
    get mass(): number{
        return this._mass;
    }
    get satellite_name(): string{
        return this._satellite_name;
    }
    get planet_id(): number{
        return this._planet_id;
    }
    set satellite_id(value:number) {
        this._satellite_id=value;
    }
    set radius(value:number){
        this._radius=value;
    }
    set semimajor_axis(value:number){
        this._semimajor_axis=value;
    }
    set mass(value:number){
        this._mass=value;
    }
    set satellite_name(value:string){
        this._satellite_name=value;
    }
    set planet_id(value:number){
        this._planet_id=value;
    }

    static from(arg0: Satellite) {
        return new Satellite(arg0.radius, arg0.semimajor_axis, arg0.mass, arg0.satellite_name, arg0.planet_id, arg0.satellite_id)
    }
}