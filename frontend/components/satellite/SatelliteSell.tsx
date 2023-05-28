import PlanetService from 'services/PlanetService'
import {useState,useEffect} from 'react'
import {Planet, Satellite, StatusMessage} from 'types'
import  { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import AccountService from 'services/AccountService'
import SatelliteService from '@/services/SatelliteService'

type Props={
    id: number|undefined
}

const SatelliteSell: React.FC<Props> = ({id}:Props) => {
    const router = useRouter();

    const[account_id,setAccountId] = useState<string>('')
    const [accountIdError, setAccountIdError] = useState<string>('')
    const [satellite, setSatellite] = useState<Satellite | null>(null);
    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);

    useEffect(() => {
        
        const fetchPlanet = async () => {
          const email=sessionStorage.getItem('email');
       const response=await AccountService.getAccountWithEmail(email);
        const data=await response.json();

        setAccountId(data._account_id);
          try{
          const planet_id = Number(id);
          const response = await SatelliteService.getSatelliteWithId(planet_id);
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

  const handleBuy = async () => {
    const response = await SatelliteService.sellSatellite( Number(id),account_id );
    setTimeout(() => {
      router.push('/satellite/overview');
    }, 500);
  };

  const handleNoBuy = async () => {
    router.push('/satellite/overview');
  };

  const validateAccountId = (planet_account_id:number) => {
    if(planet_account_id===null){
        setError({message: `This planet can't be sold because no one owns it`, type: 'error'});
        setTimeout(() => {
            router.push('/satellite/overview');
          }, 2000);
    }
    if(planet_account_id!==Number(account_id)&&planet_account_id!==null){
        setError({message: `You are not the owner of this planet`, type: 'error'});
        setTimeout(() => {
            router.push('/satellite/overview');
          }, 2000);
    }}

  return (
  <>{error ? (
    <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
) : (<>
{satellite ? (
    
  <>
  {validateAccountId(satellite._account_id)}
            <div className={styles.delete}>
              <p className="text-lg font-bold"></p>
              <p>Do you want to sell the planet with id {satellite._planet_id}?</p>
              <p>Planet name: {satellite._satellite_name}</p>
              
              <p>Radius: {satellite._radius}</p>
              <p>Semimajor axis: {satellite._semimajor_axis}</p>
              <p>Mass: {satellite._mass}</p>

              <p>to the account with id: {account_id}</p>
              <div className={styles.buttondiv}>
              <a href='#' onClick={handleBuy} className={styles.deletebutton}>Yes</a>
              <a href='#' onClick={handleNoBuy} className={styles.deletebutton}>No</a>
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
export default SatelliteSell;