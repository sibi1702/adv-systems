import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
import { timeStamp } from 'console';

const Post = new mongoose.Schema(
  {
    
postDescription: {
      type: String,
      required: true,
      index: true,
           },
scheduledDateTime:{
      type: Date,
      required: true,
      index: true, 
           },
postInFacebook:{
      type:Boolean,
      default: false,
      index: true, 
           },
postInInstagram:{
      type:Boolean,
      default: false,
      index: true, 
           },
postInTwitter:{
      type:Boolean,
      default: false,
      index: true, 
           },
postInLinkedin:{
      type:Boolean,
      default: false,
      index: true, 
           },  
userId:{
      type:String,
      index: true,
},
  },
  { timestamps: true },

);

export default mongoose.model<IUser & mongoose.Document>('Post', Post);