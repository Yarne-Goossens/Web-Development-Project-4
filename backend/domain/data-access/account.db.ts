import { Account } from "../model/account";
import { PrismaClient, account as PrismaAccount } from "@prisma/client";

const prisma = new PrismaClient();

 async function getAllAccounts(): Promise<Account[]> {
    const accounts: PrismaAccount[] = await prisma.account.findMany();
    return accounts.map((account) => Account.from(<Account>account));
}

 async function getAccountWithId(id: number): Promise<Account> {
    const account: PrismaAccount = await prisma.account.findUnique({ where: { account_id: id } });
    return Account.from(<Account>account);
}

 async function addAccount(account: Account) {
    await prisma.account.create({
        data: {
            email: account.email,
            username: account.username,
            password: account.password
        },
    });
}

 async function updateAccount(id: number, account: Account) {
    await prisma.account.update({
        where: {account_id: id},
        data: {
            email: account.email,
            username: account.username,
            password: account.password
            },
    });
}

async function deleteAccount(id: number) {
    await prisma.account.delete({ where: { account_id: id } });
}

 async function loginValidation(email: string, password: string): Promise<boolean> {
    const account: PrismaAccount = await prisma.account.findFirst({ where: { email: email } });
    if(account === null) return false;
    return account.password === password;
}

 async function idExists(id: number): Promise<boolean> {
    const account: PrismaAccount = await prisma.account.findUnique({ where: { account_id: id } });
    return !!account ;
}

 async function emailExists(email: string): Promise<boolean> {
    const account: PrismaAccount = await prisma.account.findFirst({ where: { email: email } });
    return account !== null;
}

 async function getUserByEmail(email: string): Promise<Account> {
    
    const account: PrismaAccount = await prisma.account.findFirst({ where: { email: email } });
    
    return Account.from(<Account>account);
}

export async function accountEmailExistsExceptSameAccount(id:number,email: string): Promise<boolean> {
    const account: PrismaAccount = await prisma.account.findFirst({ where: { email: email,account_id:{not:id} } });
    return !!account;
}

const AccountDb={
    getAllAccounts,addAccount,getAccountWithId,updateAccount,deleteAccount,loginValidation,idExists,emailExists,getUserByEmail
    
}
export default AccountDb