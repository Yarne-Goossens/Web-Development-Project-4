import ResourceService from "@/services/ResourceService"
import { Resource, StatusMessage } from "@/types"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from '@/styles/Home.module.css'

const ResourceAdd:React.FC=()=>{
const[resources,setResources] = useState<Array<Resource>>([])

    const[resource_name,setResourceName] = useState<string>('')
    const[resourceNameError,setNameError] = useState<string>('')

    const[chemical_composition,setChemical_composition] = useState<string>('')
    const[chemical_compositionError,setChemical_compositionError] = useState<string>('')

    const[description,setDescription] = useState<string>('')
    const[descriptionError,setDescriptionError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);

    const router=useRouter()
    var { id } = router.query;


    useEffect(()=>{
        if (id) {
        }
      }, [id])

    const validate=():boolean=>{
        setNameError('');
        setChemical_compositionError('');
        setDescriptionError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!resource_name &&resource_name.trim()===""){
            setNameError('Resource name is required');
            errorBool=false;
        }
        if(!chemical_composition &&chemical_composition.trim()===""){
            setChemical_compositionError('Chemical composition is required');
            errorBool= false;
        }
        if(!description &&description.trim()===""){
            setDescriptionError('Description is required');
            errorBool= false;
        }

        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        try{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        
        var planet_id=Number(id);
        const response= await ResourceService.addResource({resource_name: resource_name,chemical_composition: chemical_composition,description: description},planet_id);
        if(!response.ok){
            if(response.status===401){
                setError({message: `An error has occurred: you must be logged in`, type: 'error'});
            }
            else{
                setError({message: response.statusText, type: 'error'});
            }
        }
        const data= await response.json();
        if(response.status===200){

            setStatusMessage({message: `The resource was added succesfully`, type: 'success'})
            setTimeout(()=>{
                router.push('/planet/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    } catch (error) {
        console.log('Error fetching Account', error);
    } 
    };

    return (<>{error ? (
        <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
    ) : (<>  
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="resourcenameInput">Resource Name:</label>
            </div>
            <div>
                <input id='resourcenameInput' type="text" value={resource_name} onChange={(event)=>setResourceName(event.target.value)}/>
                {resourceNameError && <div className={styles.error}>{resourceNameError}</div>}
            </div>
            <div>
                <label htmlFor="chemical_compositionInput">Chemical Composition:</label>
            </div>
            <div>
                <input id='chemical_compositionInput' type="text" value={chemical_composition} onChange={(event)=>setChemical_composition(event.target.value)}/>
                {chemical_compositionError && <div className={styles.error}>{chemical_compositionError}</div>}
            </div>
            <div>
                <label htmlFor="descriptionInput">Description:</label>
            </div>
            <div>
                <input id='descriptionInput' type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                {descriptionError && <div className={styles.error}>{descriptionError}</div>}
            </div>
        </div>
        <div>
            <button type='submit' className="px-7 py-3">
                Add Resource
            </button>
        </div>
      </form>
      {statusMessage && <div className={styles.success}>{statusMessage.message}</div>}
      </>)}
      </>)
}
export default ResourceAdd;