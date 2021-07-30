import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { IPost } from '../../interfaces/IPost';
import { IUserprofile } from '../../interfaces/IUserprofile';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type PostModel = Model<IPost & Document>;
    export type UserprofileModel = Model<IUserprofile & Document>;
  }
}
