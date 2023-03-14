export class Planet {
    private _planet_name: string;
    private _planet_id: number;
    private _account_id?: number;
    private _radius: number;
    private _semimajor_axis: number;
    private _mass: number;

    constructor(
        radius: number,
        semimajor_axis: number,
        mass: number,
        planet_name: string,
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

    set planet_name(value: string) {
        this._planet_name = value;
    }

    get planet_id(): number {
        return this._planet_id;
    }

    set planet_id(value: number) {
        this._planet_id = value;
    }

    get account_id(): number | undefined {
        return this._account_id;
    }

    set account_id(value: number | undefined) {
        this._account_id = value;
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }

    get semimajor_axis(): number {
        return this._semimajor_axis;
    }

    set semimajor_axis(value: number) {
        this._semimajor_axis = value;
    }

    get mass(): number {
        return this._mass;
    }

    set mass(value: number) {
        this._mass = value;
    }

    static create_planet({
        radius,
        semimajor_axis,
        mass,
        planet_name,
        planet_id,
        account_id,
    }: {
        radius: number;
        semimajor_axis: number;
        mass: number;
        planet_name: string;
        planet_id: number;
        account_id?: number;
    }): Planet {
        return new Planet(radius, semimajor_axis, mass, planet_name, planet_id, account_id);
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
