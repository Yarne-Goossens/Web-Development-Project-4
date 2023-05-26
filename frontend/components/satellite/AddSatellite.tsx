import SatelliteService from "@/services/SatelliteService"
import { Planet, StatusMessage } from "@/types"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const AddSatellite:React.FC = () => {
const[planets,setPlanets] = useState<Array<Planet>>([])

    const[satellite_name,setName] = useState<string>('')
    const[nameError,setNameError] = useState<string>('')

    const[radius,setRadius] = useState<string>('')
    const[radiusError,setRadiusError] = useState<string>('')

    const[semimajor_axis,setSemimajor] = useState<string>('')
    const[semimajor_axisError,setSemimajorError] = useState<string>('')

    const[mass,setMass] = useState<string>('')
    const[massError,setMassError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);

    const router=useRouter()
    var { id  } =  router.query;
    
    useEffect(()=>{
        if (id) {
            console.log(id); // correct value
          }
        }, [id]);
    
    const validate=():boolean=>{
        setNameError('');
        setRadiusError('');
        setSemimajorError('');
        setMassError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!satellite_name &&satellite_name.trim()===""){
            setNameError('Satellite name is required');
            errorBool=false;
        }
        if(!radius &&radius.trim()===""||isNaN(Number(mass))){
            setRadiusError('Radius is required');
            errorBool= false;
        }
        if(!semimajor_axis &&semimajor_axis.trim()===""||isNaN(Number(mass))){
            setSemimajorError('Semimajor-Axis is required');
            errorBool= false;
        }
        if(!mass &&mass.trim()===""||isNaN(Number(mass))){
            setMassError('Mass is required');
            errorBool= false;
        }

        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        var planet_id=Number(id);
        console.log(planet_id);
        const response= await SatelliteService.addSatellite({satellite_name,radius,semimajor_axis,mass,planet_id} );

        const data= await response.json();
        console.log(response);
        console.log(data);

        if(response.status===200){
            
            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/planet/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    }
    return(
    <>
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="satellite_nameInput">Satellite Name:</label>
            </div>
            <div>
                <input id='satellite_nameInput' type="text" value={satellite_name} onChange={(event)=>setName(event.target.value)}/>
                {nameError && <div>{nameError}</div>}
            </div>
            <div>
                <label htmlFor="radiusInput">Radius:</label>
            </div>
            <div>
                <input id='radiusInput' type="text" value={radius} onChange={(event)=>setRadius(event.target.value)}/>
                {radiusError && <div>{radiusError}</div>}
            </div>
            <div>
                <label htmlFor="semimajorInput">Semimajor-Axis:</label>
            </div>
            <div>
                <input id='semimajorInput' type="text" value={semimajor_axis} onChange={(event)=>setSemimajor(event.target.value)}/>
                {semimajor_axisError && <div>{semimajor_axisError}</div>}
            </div>
            <div>
                <label htmlFor="massInput">Mass:</label>
            </div>
            <div>
                <input id='massInput' type="text" value={mass} onChange={(event)=>setMass(event.target.value)}/>
                {massError && <div>{massError}</div>}
            </div>
        </div>
        <div>
            <button type='submit'>
                Add Satellite
            </button>
        </div>
      </form>
    
      </>)
    ;}
    export default AddSatellite;