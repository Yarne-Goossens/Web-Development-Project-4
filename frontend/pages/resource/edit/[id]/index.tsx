import ResourceEdit from '@/components/resource/ResourceEdit';
import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import { useRouter } from 'next/router';

const editresource: React.FC = () => {

    const router=useRouter()
    const { id } = router.query;

    return (
      <>
      <Header />
      <MetaHead title="Edit Resource" />
      <ResourceEdit id={Number(id)}/>  
      
    </>)
}
export default editresource;
