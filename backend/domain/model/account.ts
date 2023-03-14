export class Account {
    private account_id: number
    email: string
    name: String
    address: String
    password: String
    role: String
    constructor( email?: string, name?: String, address?: String, password?: String,role?:String) {
        this.email = email
        this.name = name
        this.address = address
        this.password = password
    }

    static create_account({role, email, name, address, password}): Account {
        const account=new Account()
        account.setEmail(email);
        account.setName(name);
        account.setAddress(address);
        account.setPassword(password);
        account.setRole(role);
        return account
    }

    public getPassword(): String {return this.password}

    public getEmail(): string {return this.email }

    public getAccount_id(): number {
        return this.account_id;
    }

    public setAccount_id(account_id: number): void {
        this.account_id = account_id;
    }
    //we moeten een manier vinden om errors te throwen en catchen da ni het programma crasht
    public setEmail(email: string): void {
        //ik denk da de regex van dees ni helemaal klopt
        /* const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const result: boolean = expression.test(email); // true
        if (!result) {
            throw new Error("Email is not valid");
        } */
        this.email = email;
    }

    public setName(name: String): void {
        /* if(name === undefined || name === null || name === ""){
            throw new Error("Name is not valid");
        } */
        this.name = name;
    }

    public setAddress(address: String): void {
       /*  if(address === undefined || address === null || address === ""){
            throw new Error("Address is not valid");
        } */
        this.address = address;
    }

    public setPassword(password: String): void {
        /* if(password.length < 5){
            throw new Error("Your password is too short");
        } */
        this.password = password;
    }

    public setRole(role: String): void {
        this.role = role;
    }
}