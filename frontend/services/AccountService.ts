const accountApiURL = process.env.NEXT_PUBLIC_API_URL_ACCOUNT;

const getAllAccounts=()=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${accountApiURL}/accountoverview`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
            
        },})
}
const getAccountWithId=(account_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${accountApiURL}/getaccountwithid/${account_id}`, {
    method: 'GET',
    headers: {
        Authorization:`Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
}
const addAccount=(account:any)=>{
    console.log(account)
    const token=sessionStorage.getItem('token')
    return fetch(`${accountApiURL}/addaccount`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(account)
    })
}
const editAccount=(account:any,account_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${accountApiURL}/editaccount/${account_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(account)
    })
}
const deleteAccount=(account_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${accountApiURL}/deleteaccount/${account_id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}
const loginValidation=(email:string,password:string)=>{
    const token=sessionStorage.getItem('token')
    return fetch('http://localhost:3000/account/login',{
        
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        
    })
}
const AccountService={
    getAllAccounts,loginValidation,getAccountWithId,addAccount,editAccount,deleteAccount
    
}
export default AccountService