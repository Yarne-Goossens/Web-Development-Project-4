export class Planet {
    private _planet_name: string;
    private _planet_id: number;
    private _account_id?: number;
    private _radius: number;
    private _semimajor_axis: number;
    private _mass: number;

    constructor(
        radius?: number,
        semimajor_axis?: number,
        mass?: number,
        planet_name?: string,
        planet_id?: number,
        account_id?: number
    ) {
        this._planet_name = planet_name;
        this._radius = radius;
        this._semimajor_axis = semimajor_axis;
        this._mass = mass;
        this._planet_id = planet_id;
        this._account_id = account_id;
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

    static create_planet({
        radius,
        semimajor_axis,
        mass,
        planet_name,
        planet_id,
        account_id,
    }: {radius: number;semimajor_axis: number;mass: number;planet_name: string;planet_id: number;account_id?: number;}): Planet {
        const plan=new Planet();
        plan.radius=radius;
        plan.semimajor_axis=semimajor_axis;
        plan.mass=mass;
        plan.planet_name=planet_name;
        plan.planet_id=planet_id;
        plan.account_id=account_id;
        return plan;
    }

    static from(arg0: Planet) {
        return new Planet(
            arg0.radius,
            arg0.semimajor_axis,
            arg0.mass,
            arg0.planet_name,
            arg0.planet_id,
            arg0.account_id
        );
    }
}
