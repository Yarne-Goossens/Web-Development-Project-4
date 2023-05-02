import  Header from '../../components/header'
import MetaHead from '../../components/MetaHead'
import PlanetAddForm from '../../components/planet/planetAddForm'
import PlanetService from '../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../types'
import Router, { useRouter } from 'next/router'

const addplanet: React.FC = () => {
    const[planets,setPlanets] = useState<Array<Planet>>([])

    const[name,setName] = useState<string>('')
    const[nameError,setNameError] = useState<string>('')
    const[statusMessage,setStatusMessage] = useState<StatusMessage>(null)

    const router=useRouter()
    useEffect(()=>{
        console.log("useEffect")
    },[])

    const validate=():boolean=>{
        setNameError('');
        setStatusMessage(null);

        if(!name &&name.trim()===""){
            setNameError('Planet name is required');
            return false;
        }
        return true;
    }

    const handleSubmit=async (event)=>{
        event.preventDefault();
        if(!validate()){
            return;
        }
        
        const response= await PlanetService.addPlanet(name);
        const data= await response.json();

        if(response.status===200){
            sessionStorage.setItem("planetname",name)
            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/')
            },2000)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }

    return (
        <>
        <Header />
        <MetaHead title="Planet Overview" />
        
        <main>
            <section className='row justify-content-center'>
                <PlanetAddForm />
            </section>
        </main>
        </>)
    
}}
export default addplanet;
