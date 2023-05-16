import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import AccountOverview from '../../../components/account/AccountOverviewTable'
import AccountService from '../../../services/AccountService'
import {useState,useEffect} from 'react'
import {Account} from '../../../types'
import useInterval from "use-interval"
import { StatusMessage } from '../../../types'
const Accounts: React.FC = () => {
    const[accounts,setAccounts] = useState<Array<Account>>([])
    const [error, setError] = useState<StatusMessage | null>(null);
    
    const getAccounts = async () => {
         try{
        const response = await AccountService.getAllAccounts();
        if(!response.ok){
            if(response.status===401){
                setError({message: `An error has occurred: you must be logged in`, type: 'error'});
            }
            else{
                setError({message: response.statusText, type: 'error'});
            }
        }
        else{
            const data = await response.json();
            setAccounts(data);
        }
            
        } catch (error) {
            console.log('Error fetching Accounts', error);
        } 

    }
    useEffect(()=>{
        console.log(    "useEffect")
        getAccounts()
    },[])
    useInterval(getAccounts, 5000)
    return (<>
        <Header />
        <MetaHead title="Account Overview" />
        <div>
            {error ? (
                <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
            ) : (
                <>
            <section className="Row Row--center">
                <AccountOverview accounts={accounts} />
            </section>
                </>
            )}
        </div>
    </>)
    
}
export default Accounts
