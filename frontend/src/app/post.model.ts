export class Post {
         public postDescription;
         public scheduledDateTime;
         public postInFacebook;
         public postInInstagram;
         public postInTwitter;
         public postInLinkedin;

         

     
         constructor (postDescription: string, scheduledDateTime: Date, postInFacebook: Boolean, postInInstagram:Boolean, postInTwitter:Boolean, postInLinkedin:Boolean) {
             this.postDescription = postDescription;
             this.scheduledDateTime = scheduledDateTime;
             this.postInFacebook = postInFacebook;
             this.postInInstagram = postInInstagram;
             this.postInTwitter = postInTwitter;
             this.postInLinkedin = postInLinkedin;
         }
     }