import AccountService from "@/services/AccountService"
import { Planet, StatusMessage } from "@/types"
import { useRouter } from "next/router"
import { useState } from "react"




const AccountLogin:React.FC=()=>{
const[planets,setPlanets] = useState<Array<Planet>>([])

    const[account_email,setEmail] = useState<string>('')
    const[emailError,setEmailError] = useState<string>('')

    const[password,setPassword] = useState<string>('')
    const[passwordError,setPasswordError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);
    const router=useRouter()
    

    const validate=():boolean=>{
        setEmailError('');
        setPasswordError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!account_email &&account_email.trim()===""){
            setEmailError('Account email is required');
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
        console.log(response.status)

        if(response.status===200){
            setStatusMessage({type:'success',message:data.message})

            sessionStorage.setItem("token",data.token)
            sessionStorage.setItem("email",account_email)
            setTimeout(()=>{
                router.push('/')
            },500)
        }else if(response.status==401 ){
            setError({message:"The email/password you tried to log in with is wrong.",type:'error'})
        }
    };

    return(<>
    {error && (<p >{error.message}</p>)}
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

        {statusMessage && (<p>{statusMessage.message}</p>)}
      </form>
      
    
    </>)
}
export default AccountLogin;