import { IUserprofile } from '../interfaces/IUserprofile';
import mongoose from 'mongoose';
import { timeStamp } from 'console';

const Userprofile = new mongoose.Schema(
  {
    
description: {
      type: String,
      required: true,
           },
  },
  { timestamps: true },

);

export default mongoose.model<IUserprofile & mongoose.Document>('Userprofile', Userprofile);