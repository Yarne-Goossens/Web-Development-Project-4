import { Planet } from '../model/planet';
import {Satellite} from '../model/satellite';

export class SatelliteDb{
    private id:number=0;
    satellites: Satellite[] =[];

    constructor(){
        this.addSatellite(Satellite.create_satellite({  radius:69911 ,semimajor_axis: 778412010,mass:1.8986*Math.pow(10,27), satellite_name:'Europa', planet_id:0})),
        this.addSatellite(Satellite.create_satellite({  radius: 6371, semimajor_axis: 149598023, mass: 5.972168*Math.pow(10,24), satellite_name: 'Moon', planet_id:1})),
        this.addSatellite(Satellite.create_satellite({  radius: 1830, semimajor_axis: 227939366, mass: 6.4171*Math.pow(10,23), satellite_name: 'Deimos', planet_id:2})),
        this.addSatellite(Satellite.create_satellite({  radius: 1830, semimajor_axis: 227939366, mass: 6.4171*Math.pow(10,23), satellite_name: 'Phobos', planet_id:2}))
    }

    public addSatellite=(satellite:Satellite)=>{
        const sat=Satellite.create_satellite(satellite)
        
        sat.setSatellite_id(this.id);
        this.satellites.push(sat);
        this.id++;
    }

    public deleteSatellite=(id:number)=>{
        for(let sat of this.satellites){
            if(sat.getSatellite_id()==id){
                this.satellites.splice(this.satellites.indexOf(sat),1);
            }   
        }
    }

    public getAllSatellites=():Satellite[]=>{  
        return this.satellites;
    }

    public getAllSatellitesOfPlanetWithId=(planet_id:number):Planet[]=>{
        const planets=this.satellites;
        const res=[];
        for(let sat of planets){
            if(sat.getPlanet_id()==planet_id){
                res.push(sat);
            }
        }
        return res;
    }

    public getSatelliteWithId=(id:number):Satellite=>{
        for(let sat of this.satellites){
            if(sat.getSatellite_id()==id){
                return sat;
            }
        }   
        return null;
    }

    public editSatellite=(id:number,satellite:Satellite)=>{
        this.satellites[id-1]=satellite;
    }


}