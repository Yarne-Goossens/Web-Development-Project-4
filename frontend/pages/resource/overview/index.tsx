import  Header from '../../../components/header'
import Head from 'next/head'
import MetaHead from '../../../components/MetaHead'
import ResourceOverview from '../../../components/resource/ResourceOverviewTable'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'

const Planets: React.FC = () => {
    const[planets,setPlanets] = useState<Array<Planet>>([])

    const getPlanets = async () => {
         try{
        const response = await PlanetService.getAllPlanets();
            const data = await response.json();

            setPlanets(data);
        } catch (error) {
            console.log('Error fetching Teams', error);
        } 

    }
    useEffect(()=>{
        console.log(    "useEffect")
        getPlanets()
    },[])

    return (
        <>
        <Header />
        <MetaHead title="Planet Overview" />
        
        <main>
            <section className='row justify-content-center'>
                <ResourceOverview planets={planets} />
            </section>
        </main>
        </>)
    
}
export default Planets
