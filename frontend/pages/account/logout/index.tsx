import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import AccountService from 'services/AccountService'
import {useState,useEffect} from 'react'
import {Planet} from 'types'
import Router, { useRouter } from 'next/router'

const login: React.FC = () => {

    const[statusMessage,setStatusMessage] = useState<StatusMessage>(null)

    const router=useRouter()
    useEffect(()=>{
        logout();
        router.push('/')
    },[])

    const logout=()=>{
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
    }

    return(<>   </>)
}
export default login;
