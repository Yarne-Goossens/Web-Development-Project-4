import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import PlanetSell from '@/components/planet/PlanetSell';
import SatelliteSell from '@/components/satellite/SatelliteSell';

const buyConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <MetaHead title="Sell Planet" />
      <SatelliteSell id={Number(id)} />
      
    </>
  );
};

export default buyConfirm;
