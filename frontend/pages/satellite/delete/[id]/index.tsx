import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import SatelliteService from '../../../../services/SatelliteService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Satellite } from 'types';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [satellite, setSatellite] = useState<Satellite | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      const satellite_id = Number(id);
      const response = await SatelliteService.getSatelliteWithId(satellite_id);
      const data = await response.json();
      setSatellite(data);
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleDelete = async () => {
    const satellite_id = Number(id);
    const response = await SatelliteService.deleteSatellite( satellite_id );
    setTimeout(() => {
      router.push('/satellite/overview');
    }, 500);
  };

  const handleNoDelete = () => {
    router.push('/satellite/overview');
  };

  return (
    <>
      <Header />
      <MetaHead title="Satellite Delete" />

      {satellite ? (
        <>
          <p>Are you sure you want to delete the planet with id {satellite._satellite_id}?</p>
          <p>Planet name: {satellite._satellite_name}</p>
          <p>Account id: {satellite._account_id}</p>
          <p>Radius: {satellite._radius}</p>
          <p>Semimajor axis: {satellite._semimajor_axis}</p>
          <p>Mass: {satellite._mass}</p>
          <a href='#' onClick={handleNoDelete}>No</a>
          <br />
          <a href='#' onClick={handleDelete}>Yes</a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default deleteConfirm;
