import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import  { useRouter } from 'next/router'
import PlanetEdit from '@/components/planet/PlanetEdit'

const editplanet: React.FC = () => {
    const router=useRouter()
    const { id } = router.query;

    return (
      <>
      <Header />
      <MetaHead title="Edit Planet" />
      <PlanetEdit id={Number(id)}/>
    </>)
}
export default editplanet;
