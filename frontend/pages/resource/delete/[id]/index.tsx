import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import ResourceService from '../../../../services/ResourceService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Resource } from 'types';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [resource, setResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      const resource_id = Number(id);
      const response = await ResourceService.getResourceWithId(resource_id);
      const data = await response.json();
      setResource(data);
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleDelete = async () => {
    const resource_id = Number(id);
    const response = await ResourceService.deleteResource( resource_id );
    setTimeout(() => {
      router.push('/resource/overview');
    }, 500);
  };

  const handleNoDelete = () => {
    router.push('/resource/overview');
  };

  return (
    <>
      <Header />
      <MetaHead title="Resource Delete" />

      {resource ? (
        <>
          <p>Are you sure you want to delete the planet with id {resource._resource_id}?</p>
          <p>Resource name: {resource._resource_name}</p>
          <p>Radius: {resource._chemical_composition}</p>
          <p>Semimajor axis: {resource._description}</p>
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
