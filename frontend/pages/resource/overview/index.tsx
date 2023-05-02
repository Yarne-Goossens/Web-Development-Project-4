import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import ResourceOverview from '../../../components/resource/ResourceOverviewTable'
import ResourceService from '../../../services/ResourceService'
import {useState,useEffect} from 'react'
import {Resource} from '../../../types'
import useInterval from "use-interval"

const Resources: React.FC = () => {
    const[resources,setResources] = useState<Array<Resource>>([])

    const getResources = async () => {
         try{
        const response = await ResourceService.getAllResources();
            const data = await response.json();

            setResources(data);
        } catch (error) {
            console.log('Error fetching Resources', error);
        } 

    }
    useEffect(()=>{
        console.log(    "useEffect")
        getResources()
    },[])
    useInterval(getResources, 5000)
    return (
        <>
        <Header />
        <MetaHead title="Resource Overview" />    
        <main>
            <section className='row justify-content-center'>
                <ResourceOverview resources={resources} />
            </section>
        </main>
        </>) 
}
export default Resources
