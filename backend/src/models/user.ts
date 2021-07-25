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

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },

);

export default mongoose.model<IUser & mongoose.Document>('User', User);
