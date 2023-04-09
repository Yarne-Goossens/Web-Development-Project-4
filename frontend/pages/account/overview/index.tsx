import  Header from '../../../components/header'
import Head from 'next/head'
import MetaHead from '../../../components/MetaHead'
import AccountOverview from '../../../components/account/AccountOverviewTable'
import AccountService from '../../../services/AccountService'
import {useState,useEffect} from 'react'
import {Account} from '../../../types'

const Accounts: React.FC = () => {
    const[accounts,setAccounts] = useState<Array<Account>>([])

    const getAccounts = async () => {
         try{
        const response = await AccountService.getAllAccounts();
            const data = await response.json();

            setAccounts(data);
        } catch (error) {
            console.log('Error fetching Accounts', error);
        } 

    }
    useEffect(()=>{
        console.log(    "useEffect")
        getAccounts()
    },[])

    return (
        <>
        <Header />
        <MetaHead title="Account Overview" />
        
        <main>
            <section className='row justify-content-center'>
                <AccountOverview accounts={accounts} />
            </section>
        </main>
        </>)
    
}
export default Accounts
