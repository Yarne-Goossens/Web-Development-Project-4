import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import SatelliteOverview from '../../../components/satellite/SatelliteOverviewTable'
import SatelliteService from '../../../services/SatelliteService'
import {useState,useEffect} from 'react'
import {Satellite} from '../../../types'
import useInterval from "use-interval"
import { StatusMessage } from '../../../types'

const Satellites: React.FC = () => {
    const[satellites,setSatellites] = useState<Array<Satellite>>([])
    const [error, setError] = useState<StatusMessage | null>(null);
    const getSatellites = async () => {
         try{
        const response = await SatelliteService.getAllSatellites();
            
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
            setSatellites(data);}
    
        } catch (error) {
            console.log('Error fetching Satellites', error);
        } 
    }
    useEffect(()=>{
        console.log(    "useEffect")
        getSatellites()
    },[])
    useInterval(getSatellites, 5000)
    return (
        <>
        <Header />
        <MetaHead title="Satellite Overview" />
        <div>
            {error ? (
                <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
            ) : (
                <>
            <section className="Row Row--center">
                <SatelliteOverview satellites={satellites} />
            </section>
                </>
            )}
        </div>
    </>)
    
}
export default Satellites
