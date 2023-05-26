
import {useState,useEffect} from 'react'
import {  StatusMessage} from 'types'
import  { useRouter } from 'next/router'
import ResourceService from '@/services/ResourceService'

type Props={
    id: number|undefined
}
const ResourceEdit: React.FC<Props> = ({id}:Props) => {
const[resource_name,setName] = useState<string>('')
const[nameError,setNameError] = useState<string>('')

const[chemical_composition,setChemicalComposition] = useState<string>('')
const[chemical_compositionError,setChemicalCompositionError] = useState<string>('')

const[description,setDescription] = useState<string>('')
const[descriptionError,setDescriptionError] = useState<string>('')

const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);

const router=useRouter()


useEffect(() => {
    const fetchResource = async () => {
      const resource_id = Number(id);
      const response = await ResourceService.getResourceWithId(resource_id);
      const data = await response.json();
      console.log(data)

      setChemicalComposition(data._chemical_composition);
        setDescription(data._description)
        setName(data._resource_name);

    };

    if (id) {
      fetchResource();
    }
  }, [id]);

const validate=():boolean=>{
    setNameError('');
    setChemicalCompositionError('');
    setDescriptionError('');

    setStatusMessage(null);
    var errorBool=true;

    if(!resource_name &&resource_name.trim()===""){
        setNameError('Resource name is required');
        errorBool=false;
    }
    if(!chemical_composition &&chemical_composition.trim()===""){
        setChemicalCompositionError('Chemical compostion is required');
        errorBool= false;
    }
    if(!description &&description.trim()===""){
        setDescriptionError('Description is required');
        errorBool= false;
    }

    return errorBool;
}

const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!validate()){
        return; 
    }
    const response= await ResourceService.editResource({resource_name,chemical_composition,description},Number(id));
    const data= await response.json();
    
    if(response.status===200){
        
        setStatusMessage({type:'success',message:data.message})
        setTimeout(()=>{
            router.push('/resource/overview')
        },500)
    }else if(response.status===400){
        setStatusMessage({type:'error',message:data.message})
    }

    
};

return(<>
    
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="resourcenameInput">Resource Name:</label>
            </div>
            <div>
                <input id='resourcenameInput' type="text" value={resource_name} onChange={(event)=>setName(event.target.value)}/>
                {nameError && <div>{nameError}</div>}
            </div>
            <div>
                <label htmlFor="chemicalCompositionInput">Chemical composition:</label>
            </div>
            <div>
                <input id='chemicalCompositionInput' type="text" value={chemical_composition} onChange={(event)=>setChemicalComposition(event.target.value)}/>
                {chemical_compositionError && <div>{chemical_compositionError}</div>}
            </div>
            <div>
                <label htmlFor="descriptionInput">Description:</label>
            </div>
            <div>
                <input id='descriptionInput' type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                {descriptionError && <div>{descriptionError}</div>}
            </div>
        </div>
        <div>
            <button type='submit'>
                Edit Resource
            </button>
        </div>
      </form>
    
    
    </>)
}
export default ResourceEdit;