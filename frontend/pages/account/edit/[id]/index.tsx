import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import {useState,useEffect} from 'react'
import {Account, StatusMessage} from 'types'
import  { useRouter } from 'next/router'
import AccountService from '@/services/AccountService'
import AccountEdit from '@/components/account/AccountEdit'

const editaccount: React.FC = () => {
    const router=useRouter()
    const { id } = router.query;
    
    
    return (
      <>
      <Header />
      <MetaHead title="Edit Account" />
        
      <AccountEdit id={Number(id)}/>
    </>)
}
export default editaccount;
