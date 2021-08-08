import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please enter a first name'],
    },

    lastname: {
      type: String,
      required: [true, 'Please enter a first name'],
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },

    bioDescription: {
      type: String,
    },

    companyName: {
      type: String,
    },

    jobTitle: {
      type: String,
    },

    urlFacebook: {
      type: String,
    },

    urlInstagram: {
      type: String,
    },

    urlTwitter: {
      type: String,
    },

    urlLinkedin: {
      type: String,
    },
  },
  { timestamps: true },

);

export default mongoose.model<IUser & mongoose.Document>('User', User);
