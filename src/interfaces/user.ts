export type Roles = 'admin'| 'user';
import * as mongoose from "mongoose";

export interface IUser {
  psw: string;
  cardNumber?: string;
  login: string;
  email?: string;
  _id?: mongoose.Types.ObjectId;
  role?: Roles,


}
export interface IResponseUser {
  id: mongoose.Types.ObjectId,
  access_token: string,
  role: Roles
}