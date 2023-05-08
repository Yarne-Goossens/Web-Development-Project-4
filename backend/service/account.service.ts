import {Account} from '../domain/model/account';

import AccountDb from '../domain/data-access/account.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const getAllAccounts=async():Promise<Account[]>=>await AccountDb.getAllAccounts();

    const addAccountService=async(account:Account)=>{
        const hashpass=await bcrypt.hash(account.password,12);
        account.password=hashpass;
        await AccountDb.addAccount(account);
    }

    const getAccountById=async(id:number):Promise<Account>=>await AccountDb.getAccountWithId(id);

    const updateAccount=async(id:number,account:Account)=>await updateAccount(id,account);

    const deleteAccount=async (id:number)=>await deleteAccount(id);

    const loginValidation=async({email,password}):Promise<string>=>{
        
        const user=await AccountDb.getUserByEmail(email);
        const isValidPassword=await bcrypt.compare(password,user.password);

        if(!isValidPassword) {throw new Error('Invalid password');}
        return generateJwtToken(email);
    }

    const idExistsService=async(id:number):Promise<boolean>=>await AccountDb.idExists(id);

    const emailExistsService=async(email:string):Promise<boolean>=>await AccountDb.emailExists(email);

    const jwtSecret=process.env.JWT_SECRET;

    const generateJwtToken=(username:string):string =>{

        const options={expiresIn: `${process.env.JWT_EXPIRES_HOURS}`,issuer:'planetwebshop'};
        try{
            return jwt.sign({username},process.env.JWT_SECRET,options);
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
     }

     const AccountService={
        getAllAccounts,addAccountService,getAccountById,updateAccount,deleteAccount,loginValidation,idExistsService,emailExistsService,generateJwtToken
    }
    export default AccountService