import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'
import useInterval from "use-interval"
import Router, { useRouter } from 'next/router'

const deleteConfirm: React.FC = () => {
  const[planet_id,setId] = useState<string>('')
    const router=useRouter()
    var { id  } =  router.query;
    
    useEffect(()=>{
        if (id) {
            console.log(id); // correct value
          }
        }, [id]);

    const handleDelete=async ()=>{
      var planet_id=id as string
      const response= await PlanetService.deletePlanet({planet_id})
      
      setTimeout(()=>{
        router.push('/planet/overview')
    },500)
    };

    const handleNoDelete=async ()=>{
      setTimeout(()=>{
        router.push('/planet/overview')
    },500)
    };

    return (<>
      <Header />
      <MetaHead title="Planet Delete" />
      <p>Are you sure you want to delete the planet with id:</p>
      <a href='#' onClick={handleNoDelete}>No</a>
      <a href='#' onClick={handleDelete}>Yes</a>
    </>)
}
export default deleteConfirm

