export class Resource {
    private _resource_id: number
    private _resource_name: string
    private _chemical_composition: string
    private _description: string
    private _planet_id: number

    constructor (resource_name?: string, chemical_composition?: string, description?: string, planet_id?: number, resource_id?:number) {
        this._resource_name = resource_name
        this._chemical_composition = chemical_composition
        this._description = description
        this._planet_id = planet_id
        this._resource_id = resource_id
    }

    get resource_id(): number {
        return this._resource_id;
    }
    get resource_name(): string {
        return this._resource_name;
    }
    get chemical_composition(): string {
        return this._chemical_composition;
    }
    get description(): string {
        return this._description;
    }
    get planet_id(): number {
        return this._planet_id;
    }
    set resource_id(value:number) {
        this._resource_id = value;
    }
    set resource_name(value:string) {
        this._resource_name = value;
    }
    set chemical_composition(value:string) {
        this._chemical_composition=value;
    }
    set description(value:string) {
        this._description=value;
    }
    set planet_id(value:number) {
        this._planet_id=value;
    }

    static from(arg0: Resource) {
        return new Resource(arg0.resource_name, arg0.chemical_composition, arg0.description, arg0.planet_id, arg0.resource_id)
    }
}