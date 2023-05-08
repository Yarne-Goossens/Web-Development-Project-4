const getAllAccounts=()=>{
    return fetch('http://localhost:3000/account/accountoverview')
}
const loginValidation=(email:string,password:string)=>{
    console.log({email,password})
    return fetch('http://localhost:3000/account/login',{
        
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        
    })
}
const AccountService={
    getAllAccounts,loginValidation
    
}
export default AccountService