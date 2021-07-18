export class User {
    private firstname;
    private lastname;
    private email;
    private password;

    constructor (firstname: string, lastname: string, email: string, password: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}