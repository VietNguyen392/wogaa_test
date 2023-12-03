import { Request } from 'express';
import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  rf_token?: string;
  type: string;
  _doc: object;
}
export interface INewUser {
  fullName: string;
  email: string;
  password: string;
}
export interface IDecodedToken {
  id?: string;
  payload?: object | any;
  newRegister?: INewUser;
  iat: number;
  exp: number;
}
export interface IReqAuth extends Request {
  user?: IUser;
}
export interface IPoll{
  user:IUser,
  title:string,
  options:string[]
  user_voted:string[]
}
export interface IOptions{
  name:string,
  poll:IPoll,
  count:number
}