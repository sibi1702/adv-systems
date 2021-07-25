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
           
  },
  { timestamps: true },

);

export default mongoose.model<IUser & mongoose.Document>('Post', Post);