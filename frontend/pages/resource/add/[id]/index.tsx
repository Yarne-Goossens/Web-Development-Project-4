import ResourceAdd from '@/components/resource/ResourceAdd';
import  Header from 'components/header'
import MetaHead from 'components/MetaHead'

const addresource: React.FC = () => {

    return (
      <>
      <Header />
      <MetaHead title="Resource Add" />
      <ResourceAdd/>  
      
    </>)
}
export default addresource;
