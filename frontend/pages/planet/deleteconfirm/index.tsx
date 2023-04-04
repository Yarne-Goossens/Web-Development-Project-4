import  Header from '../../../components/header'
import Head from 'next/head'
import MetaHead from '../../../components/MetaHead'
import PlanetOverview from '../../../components/planet/PlanetOverviewTable'
import PlanetService from '../../../services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet} from '../../../types'
type Props  = {
    toDelete:Planet
  }
const DeleteConfirm:React.FC<Props> = ({toDelete}:Props) => {
    return (<></>)
}

export default DeleteConfirm