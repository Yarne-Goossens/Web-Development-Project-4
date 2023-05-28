import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import PlanetBuy from '@/components/planet/PlanetBuy';

const buyConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <MetaHead title="Buy Planet" />
      <PlanetBuy id={Number(id)} />
      
    </>
  );
};

export default buyConfirm;
