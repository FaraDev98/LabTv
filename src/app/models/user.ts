export class RegisterDto {
    email: string;
    password: string;
    nome: string;

    constructor(e: string = "", p: string = "", n: string = "") {
        this.email = e;
        this.password = p;
        this.nome = n;
    }
}

export class LoginDto {
    email: string;
    password: string;

    constructor(e: string = "", p: string = "", n: string = "") {
        this.email = e;
        this.password = p;
    }
}

export class ContactsForm {
    nome: string;
    cognome: string;
    email: string;
    numeroTelefono: string;
    messaggio: string;

    constructor(n: string = "", c: string = "", e: string = "", ntel: string = "", m: string = "") {
        this.nome = n;
        this.cognome = c;
        this.email = e;
        this.numeroTelefono = ntel;
        this.messaggio = m;

    }
}

export interface User {
    email: string;
    id: number;
    nome: string;
}

export interface LoggedUser {
    user: User;
    accessToken: string;
}