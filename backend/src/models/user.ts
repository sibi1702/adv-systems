import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please enter a first name'],
      index: true,
    },

    lastname: {
      type: String,
      required: [true, 'Please enter a first name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    phone: {
      type: Number,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },

    bioDescription: {
      type: String,
      index : true,
    },

    companyName: {
      type: String,
      index : true,
    },

    jobTitle: {
      type: String,
      index : true,
    },
    
    urlFacebook: {
      type: String,
      index : true,
    },

    urlInstagram: {
      type: String,
      index : true,
    },

    urlTwitter: {
      type: String,
      index : true,
    },

    urlLinkedin: {
      type: String,
      index : true,
    },
  },
  { timestamps: true },

);

export default mongoose.model<IUser & mongoose.Document>('User', User);
