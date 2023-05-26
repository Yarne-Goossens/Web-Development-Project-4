import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import SatelliteService from '../../../../services/SatelliteService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Satellite } from 'types';
import DeleteSatellite from '@/components/satellite/DeleteSatellite';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  

  return (
    <>
      <Header />
      <MetaHead title="Satellite Delete" />
<DeleteSatellite id={Number(id)} />
      
    </>
  );
};

export default deleteConfirm;
