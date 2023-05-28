import {Account} from '../domain/model/account';

import AccountDb, { accountEmailExistsExceptSameAccount } from '../domain/data-access/account.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const getAllAccounts=async():Promise<Account[]>=>await AccountDb.getAllAccounts();

    const addAccountService=async(account:Account)=>{
        const email=account.email;const username=account.username;const password=account.password;

        if(await emailExistsService(email)){throw new Error("Email already exists");}
        if(email==null|| email==""){throw new Error("Email cannot be empty");}
        if(username==null|| username==""){throw new Error("Name cannot be empty");}
        if(password==null|| password==""){throw new Error("Password cannot be empty");}
        //check if email is valid using regex
        if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){throw new Error("Email is not valid");}

        const hashpass=await bcrypt.hash(account.password,12);
        account.password=hashpass;

        await AccountDb.addAccount(account);
    }

    const getAccountById=async(id:number):Promise<Account>=>{
        if(await AccountDb.idExists(id)==false)throw new Error('Account does not exist');

        return await AccountDb.getAccountWithId(id);
    }

    const getAccountByEmail=async(email:string):Promise<Account>=>{
        if(await AccountDb.emailExists(email)==false) throw new Error('Account does not exist');
        return await AccountDb.getUserByEmail(email);
}

    const updateAccount=async(id:number,account:Account)=>{
        const email=account.email;const username=account.username;const password=account.password;

        if(await AccountDb.idExists(id)==false){throw new Error('Account does not exist');}
        if(await accountEmailExistsExceptSameAccount(id,email)){throw new Error("Email already exists");}
        if(email==null|| email==""){throw new Error("Email cannot be empty");}
        if(username==null|| username==""){throw new Error("Name cannot be empty");}
        if(password==null|| password==""){throw new Error("Password cannot be empty");}

        const hashpass=await bcrypt.hash(account.password,12);
        account.password=hashpass;
        await AccountDb.updateAccount(id,account);
    }

    const deleteAccount=async (id:number)=>{
        if(await AccountDb.idExists(id)==false){throw new Error('Account does not exist');}
        await AccountDb.deleteAccount(id);
    }

    const loginValidation=async(email:string,password:string):Promise<string>=>{
        const user=await AccountDb.getUserByEmail(email);
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword) {throw new Error('Invalid password');}
        return generateJwtToken(email);
    }

    const idExistsService=async(id:number):Promise<boolean>=>await AccountDb.idExists(id);

    const emailExistsService=async(email:string):Promise<boolean>=>await AccountDb.emailExists(email);

    const jwtSecret=process.env.JWT_SECRET;

    const generateJwtToken=(username:string):string =>{

        const options={expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,issuer:'whatt'};
        try{
            return jwt.sign({username},process.env.JWT_SECRET,options);
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
     }

     const AccountService={
        getAllAccounts,addAccountService,getAccountById,updateAccount,deleteAccount,loginValidation,idExistsService,emailExistsService,generateJwtToken,getAccountByEmail
    }
    export default AccountService