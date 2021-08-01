export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  salt: string;
  bioDescription: string;
  companyName: string;
  jobTitle: string;
  urlFacebook: string;
  urlInstagram: string;
  urlTwitter: string;
  urlLinkedin: string;
}

export interface IUserInputDTO {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  bioDescription: string;
  companyName: string;
  jobTitle: string;
  urlFacebook: string;
  urlInstagram: string;
  urlTwitter: string;
  urlLinkedin: string;

}
