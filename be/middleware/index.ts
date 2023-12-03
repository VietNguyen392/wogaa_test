import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth, IUser } from "../utils";
import { User } from "../models";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../config/main";
export const authenticate = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).send({ msg: "Invalid" });
    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    );
    if (!decoded) return res.status(400).send({ msg: "Invalid" });
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(500).send({ msg: error.message });
  }
};
export const handleUserLogin = async (
  user: IUser,
  password: string,
  res: Response
) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    let msgError = "Wrong password";
    return res.status(400).json({ msg: msgError });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/rf-token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: "Login Success!",
    status: 200,
    access_token,
    user: { ...user._doc, password: "" },
  });
};
