import { Account } from "../model/account";
export class AccountDb{
    private id:number=0;
    accounts: Account[] =[];

    constructor(){
        this.addAccount(Account.create_account({email:"cas.oli@gmail.com" ,name: "Casper",address:"Tielt-Winge", password: "21345",role:"admin"}))
    }

    public addAccount=(account:Account)=>{
        const res=Account.create_account(account)
        
        res.setAccount_id(this.id);
        this.accounts.push(res);
        this.id++;
    }

    public getAllAccounts=():Account[]=>{  
        return this.accounts;
    }

    public getAccountById=(id:number):Account=>{
        return this.accounts.find(account=>account.getAccount_id()===id);
    }

    public updateAccount=(id:number,account:Account)=>{
        for(let acc of this.accounts){
            if(acc.getAccount_id()==id){
                let index=this.accounts.indexOf(acc);
                this.accounts[index]=account;
            }
        }   
    }

    public deleteAccount=(id:number)=>{
        const index=this.accounts.findIndex(acc=>acc.getAccount_id()===id);
        this.accounts.splice(index,1);
    }

    public loginValidation=(email:string,password:string):boolean=>{
        for(let acc of this.accounts){
            if(acc.getEmail()==email && acc.getPassword()==password){
                return true;
            }
        }
        //throw new Error("Email or password is not correct");
    }
}