import {useState,useEffect} from 'react'
import {Planet, StatusMessage} from 'types'
import Router, { useRouter } from 'next/router'

const login: React.FC = () => {

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);

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
