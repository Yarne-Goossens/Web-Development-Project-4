import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import AccountService from 'services/AccountService'
import {useState,useEffect} from 'react'
import {Planet} from 'types'
import Router, { useRouter } from 'next/router'

const login: React.FC = () => {

    const[planets,setPlanets] = useState<Array<Planet>>([])

    const[account_email,setEmail] = useState<string>('')
    const[emailError,setEmailError] = useState<string>('')

    const[password,setPassword] = useState<string>('')
    const[passwordError,setPasswordError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage>(null)

    const router=useRouter()
    useEffect(()=>{
        console.log("useEffect")
    },[])

    const validate=():boolean=>{
        setEmailError('');
        setPasswordError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!account_email &&account_email.trim()===""){
            setEmailError('Planet name is required');
            errorBool=false;
        }
        if(!password &&password.trim()===""){
            setPasswordError('Password is required');
            errorBool= false;
        }
        
        

        return errorBool;
    }

    const handleSubmit=async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(!validate()){
            return; 
        }
        
        const response= await AccountService.loginValidation(account_email,password);
        const data= await response.json();
        console.log(response);
        console.log(data);

        if(response.status===200){
            setStatusMessage({type:'success',message:data.message})

            sessionStorage.setItem("token",data.token)
            sessionStorage.setItem("email",account_email)
            setTimeout(()=>{
                router.push('/')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };

    return (
      <>
      <Header />
      <MetaHead title="Planet Add" />
        
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="accountemailInput">Email:</label>
            </div>
            <div>
                <input id='planetnameInput' type="text" value={account_email} onChange={(event)=>setEmail(event.target.value)}/>
                {emailError && <div>{emailError}</div>}
            </div>
            <div>
                <label htmlFor="passwordInput">Password:</label>
            </div>
            <div>
                <input id='passwordInput' type="text" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                {passwordError && <div>{passwordError}</div>}
            </div>
            
        </div>
        <div>
            <button type='submit'>
                Login
            </button>
        </div>
      </form>
    </>)
}
export default login;
