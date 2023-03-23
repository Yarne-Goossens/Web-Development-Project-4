export class Account {
    private _account_id: number
    private _email: string
    private _username: string
    private _address: string
    private _password: string
    private _role: string

    constructor( email?: string, username?: string,  password?: string,role?:string,account_id?: number) {
        this._email = email
        this._username = username
        this._password = password
        this._account_id=account_id
        this._role=role
    }

    get email(): string {
        return this._email;
    }
    get account_id(): number {
        return this._account_id;
    }
    get name(): string {
        return this._username;
    }
    get address(): string {
        return this._address;
    }
    get password(): string {
        return this._password;
    }
    get role(): string {
        return this._role;
    }
    //we moeten een manier vinden om errors te throwen en catchen da ni het programma crasht
    set email(value: string) {

        this._email = value;
    }
    set account_id(value: number) {
        //gets set by the database
        this._account_id = value;
    }
    set name(value: string) {
        this._username = value;
    }
    set address(value: string) {
        this._address = value;
    }
    set password(value: string) {
        this._password = value;
    }
    set role(value: string) {
        this._role = value;
    }

    static from(arg0: Account) {
        return new Account(
            arg0.account_id,
            arg0.email,
            arg0._username,
            arg0.password,
            arg0.role,
        );
    }
}