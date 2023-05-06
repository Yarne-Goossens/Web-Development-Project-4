import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import ResourceService from 'services/ResourceService'
import {useState,useEffect} from 'react'
import {Planet} from 'types'
import  { useRouter } from 'next/router'

const addplanet: React.FC = () => {

    const[planets,setPlanets] = useState<Array<Planet>>([])

    const[resource_name,setResourceName] = useState<string>('')
    const[resourceNameError,setNameError] = useState<string>('')

    const[chemical_composition,setChemical_composition] = useState<string>('')
    const[chemical_compositionError,setChemical_compositionError] = useState<string>('')

    const[description,setDescription] = useState<string>('')
    const[descriptionError,setDescriptionError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage>(null)

    const router=useRouter()
    const { id } = router.query;


    useEffect(()=>{
        if (id) {
          console.log(id);
        }
      }, [id])

    const validate=():boolean=>{
        setNameError('');
        setChemical_compositionError('');
        setDescriptionError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!resource_name &&resource_name.trim()===""){
            setNameError('Planet name is required');
            errorBool=false;
        }
        if(!chemical_composition &&chemical_composition.trim()===""){
            setChemical_compositionError('Radius is required');
            errorBool= false;
        }
        if(!description &&description.trim()===""){
            setDescriptionError('Semimajor-Axis is required');
            errorBool= false;
        }
        
        //isNan
        if(isNaN(Number(chemical_composition))){
            setChemical_compositionError('The radius you entered is not a number');
            errorBool= false;
        }
        if(isNaN(Number(description))){
            setDescriptionError('The semimajor axis you entered is not a number');
            errorBool= false;
        }

        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        
        const response= await ResourceService.addResource({resource_name: resource_name,chemical_composition: chemical_composition,description: description},id);
        const data= await response.json();
        console.log(response);
        console.log(data);
        if(response.status===200){
            sessionStorage.setItem("planet_name",resource_name)
            sessionStorage.setItem("radius",chemical_composition)
            sessionStorage.setItem("semimajor_axis",description)

            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/planet/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };

    return (
      <>
      <Header />
      <MetaHead title="Planet Add" />
        
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="planetnameInput">Resource Name:</label>
            </div>
            <div>
                <input id='planetnameInput' type="text" value={resource_name} onChange={(event)=>setResourceName(event.target.value)}/>
                {resourceNameError && <div>{resourceNameError}</div>}
            </div>
            <div>
                <label htmlFor="radiusInput">Chemical Composition:</label>
            </div>
            <div>
                <input id='radiusInput' type="text" value={chemical_composition} onChange={(event)=>setChemical_composition(event.target.value)}/>
                {chemical_compositionError && <div>{chemical_compositionError}</div>}
            </div>
            <div>
                <label htmlFor="semimajorInput">Description:</label>
            </div>
            <div>
                <input id='semimajorInput' type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                {descriptionError && <div>{descriptionError}</div>}
            </div>
        </div>
        <div>
            <button type='submit'>
                Add Resource
            </button>
        </div>
      </form>
    </>)
}
export default addplanet;
