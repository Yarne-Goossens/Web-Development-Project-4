import SatelliteService from "@/services/SatelliteService";
import { Satellite, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props={
    id: number|undefined
}
const DeleteSatellite: React.FC<Props> = ({id}:Props) => {
    const router = useRouter();
    const [satellite, setSatellite] = useState<Satellite | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);

    useEffect(() => {
      const fetchPlanet = async () => {
        try{
        const satellite_id = Number(id);
        const response = await SatelliteService.getSatelliteWithId(satellite_id);
        if(!response.ok){
          if(response.status===401){
              setError({message: `An error has occurred: you must be logged in`, type: 'error'});
          }
          else{
              setError({message: response.statusText, type: 'error'});
          }
      }
        const data = await response.json();
        setSatellite(data);
      } catch (error) {
        console.log('Error fetching Account', error);
    } 
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

    return (<>{error ? (
        <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
    ) : (<>
    {satellite ? (
        <>
          <p>Are you sure you want to delete the planet with id {satellite._satellite_id}?</p>
          <p>Satellite name: {satellite._satellite_name}</p>
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
    </>)}
    </>)
}
export default DeleteSatellite;