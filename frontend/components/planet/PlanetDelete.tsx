import PlanetService from "@/services/PlanetService";
import { Planet } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props={
    id: number|undefined
}
const PlanetDelete: React.FC<Props> = ({id}:Props) => {
const router = useRouter();

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
  return (<>{planet ? (
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
  )}</>)}
export default PlanetDelete;