const getAllAccounts=()=>{
    return fetch('http://localhost:3000/account/accountoverview')
}
const AccountService={
    getAllAccounts
}
export default AccountService