import { IPost } from '../interfaces/IPost';
import mongoose from 'mongoose';
import { timeStamp } from 'console';

const Post = new mongoose.Schema(
  {
    
postDescription: {
      type: String,
      required: true,
           },
scheduledDateTime:{
      type: Date,
      required: true,
           },
postInFacebook:{
      type:Boolean,
      default: false,
           },
postInInstagram:{
      type:Boolean,
      default: false,
           },
postInTwitter:{
      type:Boolean,
      default: false,
           },
postInLinkedin:{
      type:Boolean,
      default: false,
           },  
userId:{
      type:String,
      index: true,
},
  },
  { timestamps: true },

);

export default mongoose.model<IPost & mongoose.Document>('Post', Post);