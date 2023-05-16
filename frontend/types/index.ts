export interface Planet{
    _planet_name:string
    _planet_id:number
    _account_id:number
    _radius:number
    _semimajor_axis:number
    _mass:number
    _satellites: Satellite[]
    _resources: Resource[]
}

export interface Satellite{
    satellite_id: number
    radius: number
    semimajor_axis: number
    mass: number
    satellite_name: string
    planet_id: number
    account_id?: number
}

export interface Resource{
    resource_id: number
    resource_name: string
    chemical_composition: string
    description: string
    planet_id: number
}

export interface Account{
    _account_id: number
    _email: string
    _username: string
    _password: string
    _role: string
}

export interface StatusMessage {
    type: string;
    message: string;
}