import  Header from '../../../components/header'
import Head from 'next/head'
import MetaHead from '../../../components/MetaHead'
import SatelliteOverview from '../../../components/satellite/SatelliteOverviewTable'
import SatelliteService from '../../../services/SatelliteService'
import {useState,useEffect} from 'react'
import {Satellite} from '../../../types'

const Satellites: React.FC = () => {
    const[satellites,setSatellites] = useState<Array<Satellite>>([])

    const getSatellites = async () => {
         try{
        const response = await SatelliteService.getAllSatellites();
            const data = await response.json();

            setSatellites(data);
        } catch (error) {
            console.log('Error fetching Satellites', error);
        } 
    }
    useEffect(()=>{
        console.log(    "useEffect")
        getSatellites()
    },[])

    return (
        <>
        <Header />
        <MetaHead title="Satellite Overview" />
        
        <main>
            <section className='row justify-content-center'>
                <SatelliteOverview satellites={satellites} />
            </section>
        </main>
        </>)
    
}
export default Satellites
