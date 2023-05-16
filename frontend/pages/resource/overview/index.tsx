import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import ResourceOverview from '../../../components/resource/ResourceOverviewTable'
import ResourceService from '../../../services/ResourceService'
import {useState,useEffect} from 'react'
import {Resource} from '../../../types'
import useInterval from "use-interval"
import { StatusMessage } from '../../../types'

const Resources: React.FC = () => {
    const[resources,setResources] = useState<Array<Resource>>([])
    const [error, setError] = useState<StatusMessage | null>(null);

    const getResources = async () => {
         try{
        const response = await ResourceService.getAllResources();
        if(!response.ok){
                
            if(response.status===401){
                setError({message: `An error has occurred: you must be logged in`, type: 'error'});
            }
            else{
                setError({message: response.statusText, type: 'error'});
            }
        }
        else{
        const data = await response.json();
        setResources(data);}

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
        <div>
            {error ? (
                <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
            ) : (
                <>
            <section className="Row Row--center">
                <ResourceOverview resources={resources} />
            </section>
                </>
            )}
        </div>
    </>) 
}
export default Resources
