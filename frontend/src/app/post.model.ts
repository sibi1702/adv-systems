export class Post {
         private postDescription;
         private scheduledDateTime;
         private postInFacebook;
         private postInInstagram;
         private postInTwitter;
         private postInLinkedin;

         

     
         constructor (postDescription: string, scheduledDateTime: Date, postInFacebook: Boolean, postInInstagram:Boolean, postInTwitter:Boolean, postInLinkedin:Boolean) {
             this.postDescription = postDescription;
             this.scheduledDateTime = scheduledDateTime;
             this.postInFacebook = postInFacebook;
             this.postInInstagram = postInInstagram;
             this.postInTwitter = postInTwitter;
             this.postInLinkedin = postInLinkedin;
         }
     }