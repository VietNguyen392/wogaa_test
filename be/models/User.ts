import mongoose from 'mongoose';
import { IUser, validateEmail } from '../utils';
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please insert you name'],
      trim: true,
      maxLength: [20, 'Name is limit by 20 charater'],
    },
    email: {
      type: String,
      required: [true, 'Please insert you email'],
      trim: true,
      unique: true,
      validate: [validateEmail, 'Email format invalid'],
    },
    password: {
      type: String,
      required: [true, 'Please insert password'],
      MaxLength: [20, 'Pass length require 6 to 20 char'],
    },
    role: {
      type: String,
      default: 'user',
    },
    rf_token: { type: String, select: false },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('Users', userSchema);