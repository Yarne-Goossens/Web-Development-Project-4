import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import  { useRouter } from 'next/router'
import EditSatellite from '@/components/satellite/EditSatellite'

const editsatellite: React.FC = () => {
    const router=useRouter()
    const { id } = router.query;
    

    return (
      <>
      <Header />
      <MetaHead title="Edit Satellite" />
      <EditSatellite id={Number(id)}/>
      
    </>)
}
export default editsatellite;
