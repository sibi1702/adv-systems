export class User {
    _id;
    firstname;
    lastname;
    email;
    profileImage;
    phone;
    private password;
    bioDescription;
    companyName;
    jobTitle;
    urlFacebook;
    urlInstagram;
    urlTwitter;
    urlLinkedin;

    constructor (
        _id: string,
        firstname: string,
        lastname: string,
        email: string,
        profileImage:string,
        phone: string,
        password: string,
        bioDescription: string,
        companyName:string,
        jobTitle:string,
        urlFacebook: string,
        urlInstagram: string,
        urlTwitter: string,
        urlLinkedin: string,) {
            this._id = _id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.profileImage = profileImage;
            this.phone = phone;
            this.password = password;
            this.bioDescription = bioDescription;
            this.companyName = companyName;
            this.jobTitle = jobTitle;
            this.urlFacebook = urlFacebook;
            this.urlInstagram = urlInstagram;
            this.urlTwitter = urlTwitter;
            this.urlLinkedin = urlLinkedin;
    }
}