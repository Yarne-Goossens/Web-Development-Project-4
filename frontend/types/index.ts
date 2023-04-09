export interface Planet{
    _planet_name:string
    _planet_id:number
    _account_id:number
    _radius:number
    _semimajor_axis:number
    _mass:number
}

export interface Satellite{
    _satellite_id: number
    _radius: number
    _semimajor_axis: number
    _mass: number
    _satellite_name: string
    _planet_id: number
}

export interface Resource{
    _resource_id: number
    _resource_name: string
    _chemical_composition: string
    _description: string
    _planet_id: number
}

export interface Account{
    _account_id: number
    _email: string
    _username: string
    _password: string
    _role: string
}