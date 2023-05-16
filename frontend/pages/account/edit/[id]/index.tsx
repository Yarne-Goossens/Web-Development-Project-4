import  Header from 'components/header'
import MetaHead from 'components/MetaHead'
import {useState,useEffect} from 'react'
import {Account} from 'types'
import  { useRouter } from 'next/router'
import AccountService from '@/services/AccountService'

const editaccount: React.FC = () => {

    const[username,setUsername] = useState<string>('')
    const[usernameError,setUsernameError] = useState<string>('')

    const[email,setEmail] = useState<string>('')
    const[emailError,setEmailError] = useState<string>('')

    const[password,setPassword] = useState<string>('')
    const[passwordError,setPasswordError] = useState<string>('')

    const[statusMessage,setStatusMessage] = useState<StatusMessage>(null)

    const router=useRouter()
    const { id } = router.query;

    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
          const account_id = Number(id);
          const response = await AccountService.getAccountWithId(account_id);
          const data = await response.json();
          setAccount(data);
          console.log(data)

          setUsername(data._username);
            setEmail(data._email)
            setPassword(data._password);

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
        console.log(response);
        console.log(data);
        if(response.status===200){
            sessionStorage.setItem("username",username)
            sessionStorage.setItem("email",email)
            sessionStorage.setItem("password",password)
            setStatusMessage({type:'success',message:data.message})
            setTimeout(()=>{
                router.push('/account/overview')
            },500)
        }else if(response.status===400){
            setStatusMessage({type:'error',message:data.message})
        }
    };

    return (
      <>
      <Header />
      <MetaHead title="Edit Account" />
        
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
    </>)
}
export default editaccount;