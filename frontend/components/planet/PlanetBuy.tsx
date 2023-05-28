import PlanetService from 'services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet, StatusMessage} from 'types'
import  { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

type Props={
    id: number|undefined
}

const PlanetBuy: React.FC<Props> = ({id}:Props) => {
    const router = useRouter();

    const[account_id,setAccountId] = useState<string>('')
    const [accountIdError, setAccountIdError] = useState<string>('')
    const [planet, setPlanet] = useState<Planet | null>(null);
    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);
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

  const handleBuy = async () => {
    const response = await PlanetService.buyPlanet( Number(id),account_id );
    setTimeout(() => {
      router.push('/planet/overview');
    }, 500);
  };

  return (<>{error ? (
    <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
) : (<>
{planet ? (
  <>
            <div className={styles.delete}>
              <p className="text-lg font-bold"></p>
              <p>Do you want to buy the planet with id {planet._planet_id}?</p>
              <p>Planet name: {planet._planet_name}</p>
              <p>Account id: {planet._account_id}</p>
              <p>Radius: {planet._radius}</p>
              <p>Semimajor axis: {planet._semimajor_axis}</p>
              <p>Mass: {planet._mass}</p>
              <div className={styles.buttondiv}>
              <a href='#' onClick={handleBuy} className={styles.deletebutton}>Yes</a>
              <div>
                <input id='accountIdInput' type="text" value={account_id} onChange={(event)=>setAccountId(event.target.value)}/>
                {accountIdError && <div className={styles.error}>{accountIdError}</div>}
            </div>
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
export default PlanetBuy;
