import PlanetService from 'services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet, StatusMessage} from 'types'
import  { useRouter } from 'next/router'

type Props={
    id: number|undefined
}

const PlanetEdit: React.FC<Props> = ({id}:Props) => {

    const[planet_name,setName] = useState<string>('')
    const[nameError,setNameError] = useState<string>('')

    const[radius,setRadius] = useState<string>('')
    const[radiusError,setRadiusError] = useState<string>('')

    const[semimajor_axis,setSemimajor] = useState<string>('')
    const[semimajor_axisError,setSemimajorError] = useState<string>('')

    const[mass,setMass] = useState<string>('')
    const[massError,setMassError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);
    const router=useRouter()

    useEffect(() => {
        const fetchPlanet = async () => {
        try{
          const planet_id = Number(id);
          const response = await PlanetService.getPlanetWithId(planet_id);
          
            console.log(response.status);
          if(!response.ok){
            if(response.status===401){
                setError({message: `An error has occurred: you must be logged in`, type: 'error'});
            }
            else{
                setError({message: response.statusText, type: 'error'});
            }
        }
        const data = await response.json();
            setMass(data._mass);
            setRadius(data._radius);
            setSemimajor(data._semimajor_axis);
            setName(data._planet_name);
        }
        catch(error){
            console.log('Error fetching PlanetEdit', error);

        }
        };
    
        if (id) {
          fetchPlanet();
        }
      }, [id]);

    const validate=():boolean=>{
        setNameError('');
        setRadiusError('');
        setSemimajorError('');
        setMassError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!planet_name &&planet_name.trim()===""){
            setNameError('Planet name is required');
            errorBool=false;
        }
        if(!radius &&radius.trim()===""){
            setRadiusError('Radius is required');
            errorBool= false;
        }
        if(!semimajor_axis &&semimajor_axis.trim()===""){
            setSemimajorError('Semimajor-Axis is required');
            errorBool= false;
        }
        if(!mass &&mass.trim()===""){
            setMassError('Mass is required');
            errorBool= false;
        }
        //isNan
        if(isNaN(Number(radius))){
            setRadiusError('The radius you entered is not a number');
            errorBool= false;
        }
        if(isNaN(Number(semimajor_axis))){
            setSemimajorError('The semimajor axis you entered is not a number');
            errorBool= false;
        }
        if(isNaN(Number(mass))){
            setMassError('The mass you entered is not a number');
            errorBool= false;
        }

        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        
        const response= await PlanetService.editPlanet({planet_name,radius,semimajor_axis,mass},Number(id));
        const data= await response.json();
        if(response.status===200){
            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/planet/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };

    return (<>{error ? (
        <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
    ) : (<>
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="planetnameInput">Planet Name:</label>
            </div>
            <div>
                <input id='planetnameInput' type="text" value={planet_name} onChange={(event)=>setName(event.target.value)}/>
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
                Edit Planet
            </button>
        </div>
      </form>
      </>)}
    </>)
}
export default PlanetEdit;
