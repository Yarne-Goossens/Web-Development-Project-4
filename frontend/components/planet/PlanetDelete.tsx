import PlanetService from "@/services/PlanetService";
import { Planet, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

type Props={
    id: number|undefined
}
const PlanetDelete: React.FC<Props> = ({id}:Props) => {
const router = useRouter();

const [planet, setPlanet] = useState<Planet | null>(null);
const [error, setError] = useState<StatusMessage | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try{
      const planet_id = Number(id);
      const response = await PlanetService.getPlanetWithId(planet_id);
      if(!response.ok){
        if(response.status===401){
            setError({message: `An error has occurred: you must be logged in`, type: 'error'});
        }
        else{
            setError({message: response.statusText, type: 'error'});
        }
    }
      const data = await response.json();
      setPlanet(data);
    } catch (error) {
      console.log('Error fetching Account', error);
  } 
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
  return (<>{error ? (
    <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
) : (<>
{planet ? (
  <>
            <div className={styles.delete}>
              <p className="text-lg font-bold"></p>
              <p>Are you sure you want to delete the planet with id {planet._planet_id}?</p>
              <p>Planet name: {planet._planet_name}</p>
              <p>Account id: {planet._account_id}</p>
              <p>Radius: {planet._radius}</p>
              <p>Semimajor axis: {planet._semimajor_axis}</p>
              <p>Mass: {planet._mass}</p>
              <div className={styles.buttondiv}>
              <a href='#' onClick={handleDelete} className={styles.deletebutton}>Yes</a>
              <a href='#' onClick={handleNoDelete} className={styles.deletebutton}>No</a>
              </div>
              <br />
            </div>
      </>
      ) : (
        <p>Loading...</p>
      )}
    </>)}
    </>)
    }
export default PlanetDelete;