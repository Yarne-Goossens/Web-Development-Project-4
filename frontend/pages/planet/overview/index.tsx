import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import PlanetOverview from '../../../components/planet/PlanetOverviewTable'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'
import useInterval from "use-interval"
import { StatusMessage } from '../../../types'

const Planets: React.FC = () => {
    const[planets,setPlanets] = useState<Array<Planet>>([])
    const [error, setError] = useState<StatusMessage | null>(null);
    const getPlanets = async () => {
        try{
            const response = await PlanetService.getAllPlanets();

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
            setPlanets(data);
        }
        } catch (error) {
            console.log('Error fetching Planets', error);
        } 

    }
    useEffect(()=>{
        console.log("useEffect")
        getPlanets()
    },[])
    useInterval(getPlanets, 5000)
    
return (
    <>
        <Header />
        <MetaHead title="Planet Overview" />
        <div>
            {error ? (
                <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
            ) : (
                <>
            <section className="Row Row--center">
                <PlanetOverview planets={planets} />
            </section>
                </>
            )}
        </div>
    </>
);
};
export default Planets
