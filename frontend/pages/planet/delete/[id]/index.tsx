import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import PlanetDelete from '@/components/planet/PlanetDelete';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <MetaHead title="Planet Delete" />
      <PlanetDelete id={Number(id)} />
      
    </>
  );
};

export default deleteConfirm;
