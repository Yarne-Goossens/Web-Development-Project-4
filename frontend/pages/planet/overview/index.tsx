import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import PlanetOverview from '../../../components/planet/PlanetOverviewTable'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'
import useInterval from "use-interval"

const Planets: React.FC = () => {
    const[planets,setPlanets] = useState<Array<Planet>>([])

    const getPlanets = async () => {
        try{
            const response = await PlanetService.getAllPlanets();
            const data = await response.json();

            setPlanets(data);
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
        <main>
            <section className='row justify-content-center'>
                <PlanetOverview planets={planets} />
            </section>
        </main>
        </>)
}
export default Planets
