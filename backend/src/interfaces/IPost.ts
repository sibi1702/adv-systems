export interface IPost {
         _id: string;
         postDesciption: string;
         scheduledDateTime: Date ;
         postInFacebook: boolean;
         postInInstagram: boolean;
         postInTwitter: boolean;
         postInLinkedin: boolean;
         userId: string;
         
       }
       
       export interface IPostInputDTO {
         postDesciption: string;
         scheduledDateTime: Date;
         postInFacebook: boolean;
         postInInstagram: boolean;
         postInTwitter: boolean;
         postInLinkedin: boolean;
         userId: string;
         
       }

       