import { Satellite } from './satellite';
import { Resource } from './resource';
export class Planet {
    private _planet_name: string;
    private _planet_id: number;
    private _account_id?: number;
    private _radius: number;
    private _semimajor_axis: number;
    private _mass: number;
    private _satellites: Satellite[];
    private _resources: Resource[];
    
    constructor(
        radius?: number,
        semimajor_axis?: number,
        mass?: number,
        planet_name?: string,
        planet_id?: number,
        account_id?: number,
        satellites?: Satellite[],
        resources?: Resource[]
    ) {
        this.planet_name = planet_name;
        this.radius = radius;
        this.semimajor_axis = semimajor_axis;
        this.mass = mass;
        this.planet_id = planet_id;
        this.account_id = account_id;
        this.satellites = satellites;
        this.resources = resources;
    }

     get planet_name(): string {
        return this._planet_name;
    }
    get planet_id(): number {
        return this._planet_id;
    }
    get account_id(): number | undefined {
        return this._account_id;
    }
    get radius(): number {
        return this._radius;
    }
    get semimajor_axis(): number {
        return this._semimajor_axis;
    }
    get mass(): number {
        return this._mass;
    }
    get satellites(): Satellite[] {
        return this._satellites;
    }
    get resources(): Resource[] {
        return this._resources;
    }
    //we moeten een manier vinden om errors te throwen en catchen da ni het programma crasht
    set planet_name(value: string) {
        //if(value.length < 1) throw new Error('Planet name cannot be empty');
        //if(value.length > 30) throw new Error('Planet name cannot be longer than 30 characters');
        
        this._planet_name = value;
    }
    set planet_id(value: number) {
        //gets set by the database
        this._planet_id = value;
    }
    set account_id(value: number | undefined) {
        this._account_id = value;
    }
    set radius(value: number) {
        //if(value < 0) throw new Error('Radius cannot be negative');
        this._radius = value;
    }
    set semimajor_axis(value: number) {
        //if(value < 0) throw new Error('Semimajor axis cannot be negative');
        this._semimajor_axis = value;
    }
    set mass(value: number) {
        //if(value < 0) throw new Error('Mass cannot be negative');
        this._mass = value;
    }
    set satellites(value: Satellite[]) {
        this._satellites = value;
    }
    set resources(value: Resource[]) {
        this._resources = value;
    }

    static create_planet({
        radius,
        semimajor_axis,
        mass,
        planet_name,
        planet_id,
        account_id,
        satellites,
    }: {radius: number;semimajor_axis: number;mass: number;planet_name: string;planet_id: number;account_id?: number;satellites?: Satellite[]}): Planet {
        const plan=new Planet();
        plan.radius=radius;
        plan.semimajor_axis=semimajor_axis;
        plan.mass=mass;
        plan.planet_name=planet_name;
        plan.planet_id=planet_id;
        plan.account_id=account_id;
        plan.satellites=[];
        return plan;
    } 

    static from(arg0: Planet) {
        return new Planet(
            arg0.radius,
            arg0.semimajor_axis,
            arg0.mass,
            arg0.planet_name,
            arg0.planet_id,
            arg0.account_id,
            arg0.satellites,
            arg0.resources
        );
    }
}
