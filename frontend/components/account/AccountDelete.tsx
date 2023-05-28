import AccountService from "@/services/AccountService";
import { Account, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'

type Props={
    id: number|undefined
}
const AccountDelete: React.FC<Props> = ({id}:Props) => {
const router = useRouter();

  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<StatusMessage | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      try{
      const account_id = Number(id);
      const response = await AccountService.getAccountWithId(account_id);
      if(!response.ok){
        if(response.status===401){
            setError({message: `An error has occurred: you must be logged in`, type: 'error'});
        }
        else{
            setError({message: response.statusText, type: 'error'});
        }
    }
      const data = await response.json();
      setAccount(data);
    } catch (error) {
      console.log('Error fetching Account', error);
  } 
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleDelete = async () => {
    const account_id = Number(id);
    const response = await AccountService.deleteAccount( account_id );
    setTimeout(() => {
      router.push('/account/overview');
    }, 500);
  };

  const handleNoDelete = () => {
    router.push('/account/overview');
  };

  return (<>{error ? (
    <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
) : (<>
{account ? (
    <>
      <div className={styles.delete}>
      <p>Are you sure you want to delete the account with id {account._account_id}?</p>
      <p>Username: {account._username}</p>
      <p>Email: {account._email}</p>
      <div className={styles.buttondiv}>
        <a href='#' onClick={handleDelete} className={styles.deletebutton}>Yes</a>
        <a href='#' onClick={handleNoDelete} className={styles.deletebutton}>No</a>
      </div>
        <br/>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  )}
  </>)}
  </>)}
export default AccountDelete;