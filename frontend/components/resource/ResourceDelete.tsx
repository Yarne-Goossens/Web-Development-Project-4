import ResourceService from "@/services/ResourceService";
import { Resource } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props={
    id: number|undefined
}
const ResourceDelete: React.FC<Props> = ({id}:Props) => {
    const router = useRouter();
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

    return (<>
    {resource ? (
        <>
          <p>Are you sure you want to delete the planet with id {resource._resource_id}?</p>
          <p>Resource name: {resource._resource_name}</p>
          <p>Chemical Composition: {resource._chemical_composition}</p>
          <p>Description: {resource._description}</p>
          <a href='#' onClick={handleNoDelete}>No</a>
          <br />
          <a href='#' onClick={handleDelete}>Yes</a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>)
}
export default ResourceDelete;