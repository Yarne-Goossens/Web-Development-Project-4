import { AccountDb }  from '../domain/data-access/account.db';
import {Account} from '../domain/model/account';

export class AccountService{
    private accountDb: AccountDb = new AccountDb();

    getAllAccounts=():Account[]=>this.accountDb.getAllAccounts();

    addAccountService=(account:Account)=>this.accountDb.addAccount(account);

    getAccountById=(id:number):Account=>this.accountDb.getAccountById(id);

    updateAccount=(id:number,account:Account)=>this.accountDb.updateAccount(id,account);

    deleteAccount=(id:number)=>this.accountDb.deleteAccount(id);

    loginValidation=(email:string,password:string):boolean=>this.accountDb.loginValidation(email,password);

    
}