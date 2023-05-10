const accountApiURL = process.env.NEXT_PUBLIC_API_URL_ACCOUNT;

const getAllAccounts=()=>{
    return fetch(`${accountApiURL}/accountoverview`)
}
const getAccountWithId=(account_id:any)=>{
    return fetch(`${accountApiURL}/getaccountwithid/${account_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const addAccount=(account:any)=>{
    return fetch(`${accountApiURL}/addaccount`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(account)
    })
}
const editAccount=(account:any,account_id:any)=>{
    return fetch(`${accountApiURL}/editaccount/${account_id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(account)
    })
}
const deleteAccount=(account_id:any)=>{
    console.log(account_id)
    return fetch(`${accountApiURL}/deleteaccount/${account_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
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
    getAllAccounts,loginValidation,getAccountWithId,addAccount,editAccount,deleteAccount
    
}
export default AccountService