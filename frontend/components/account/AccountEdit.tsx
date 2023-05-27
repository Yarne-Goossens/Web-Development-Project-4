import AccountService from "@/services/AccountService";
import { Account, StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


type Props={
    id: number|undefined
}
const AccountEdit: React.FC<Props> = ({id}:Props) => {

    const[username,setUsername] = useState<string>('')
    const[usernameError,setUsernameError] = useState<string>('')

    const[email,setEmail] = useState<string>('')
    const[emailError,setEmailError] = useState<string>('')

    const[password,setPassword] = useState<string>('')
    const[passwordError,setPasswordError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage | null>(null);

    const router=useRouter()

    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<StatusMessage | null>(null);
    
    useEffect(() => {
        const fetchAccount = async () => {
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

          setUsername(data._username);
            setEmail(data._email)
            setPassword(data._password);
            
        } catch (error) {
            console.log('Error fetching Account', error);
        } 
        };
    
        if (id) {
          fetchAccount();
        }
      }, [id]);

    const validate=():boolean=>{
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        setStatusMessage(null);
        var errorBool=true;

        if(!username &&username.trim()===""){
            setUsernameError('Username is required');
            errorBool=false;
        }
        if(!email &&email.trim()===""){
            setEmailError('Email is required');
            errorBool= false;
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
        const response= await AccountService.editAccount({username:username,email:email,password:password},Number(id));
        const data= await response.json();

        if(response.status===200){
            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/account/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };


    return (<>{error ? (
        <p className={`text-${error.type === 'success' ? 'green' : 'red'}-500`}>{error.message}</p>
    ) : (<>
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="usernameInput">Account Name:</label>
            </div>
            <div>
                <input id='usernameInput' type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                {usernameError && <div>{usernameError}</div>}
            </div>
            <div>
                <label htmlFor="emailInput">Email:</label>
            </div>
            <div>
                <input id='emailInput' type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
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
                Edit Account
            </button>
        </div>
      </form>
      </>)}
    </>)
};
export default AccountEdit;