import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import PlanetService from '../../../../services/PlanetService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Planet } from 'types';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [planet, setPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      const planet_id = Number(id);
      const response = await PlanetService.getPlanetWithId(planet_id);
      const data = await response.json();
      setPlanet(data);
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleDelete = async () => {
    const planet_id = Number(id);
    const response = await PlanetService.deletePlanet( planet_id );
    setTimeout(() => {
      router.push('/planet/overview');
    }, 500);
  };

  const handleNoDelete = () => {
    router.push('/planet/overview');
  };

  return (
    <>
      <Header />
      <MetaHead title="Planet Delete" />

      {planet ? (
        <>
          <p>Are you sure you want to delete the planet with id {planet._planet_id}?</p>
          <p>Planet name: {planet._planet_name}</p>
          <p>Account id: {planet._account_id}</p>
          <p>Radius: {planet._radius}</p>
          <p>Semimajor axis: {planet._semimajor_axis}</p>
          <p>Mass: {planet._mass}</p>
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
