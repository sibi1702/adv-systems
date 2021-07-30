export class User {
    firstname;
    lastname;
    email;
    profileImage;
    private password;

    constructor (firstname: string, lastname: string, email: string, profileImage:string, password: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profileImage = profileImage
        this.password = password;
    }
}