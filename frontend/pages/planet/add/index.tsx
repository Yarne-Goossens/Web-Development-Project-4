import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import PlanetAdd from '@/components/planet/PlanetAdd'

const addplanet: React.FC = () => {
    return (
      <>
      <Header />
      <MetaHead title="Planet Add" />
      <PlanetAdd/>
    </>)
}
export default addplanet;
