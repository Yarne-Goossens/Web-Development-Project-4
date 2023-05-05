import  Header from '../../../components/header'
import Head from 'next/head'
import MetaHead from '../../../components/MetaHead'
import PlanetOverview from '../../../components/planet/PlanetOverviewTable'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'
type Props  = {
    
  }
const DeleteConfirm:React.FC<Props> = () => {
    return (<>
    <Header />
      <MetaHead title="Planet Delete" />
      <p>Are you sure you want to delete the planet with id:</p>
    </>)
}

export default DeleteConfirm