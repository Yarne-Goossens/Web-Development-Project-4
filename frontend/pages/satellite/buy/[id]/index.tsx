import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import SatelliteBuy from '@/components/satellite/SatelliteBuy';

const buyConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <MetaHead title="Buy Planet" />
      <SatelliteBuy id={Number(id)} />
      
    </>
  );
};

export default buyConfirm;
