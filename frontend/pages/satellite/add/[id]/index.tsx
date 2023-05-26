import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import AddSatellite from '@/components/satellite/AddSatellite'

const addSatellite: React.FC = () => {

    

    return (
      <>
      <Header />
      <MetaHead title="Satellite Add" />
      <AddSatellite/>  
    </>)
    
}
export default addSatellite;
