import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "../config/main";
import { IDecodedToken, IReqAuth } from "../utils";
import { handleUserLogin } from "../middleware";
import { User } from "../models";
const UserController = {
  register: async (req: Request, res: Response) => {
    try {
      const { fullName, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist)
        return res.status(400).send({ msg: "Email already in use" });
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        fullName,
        email,
        password: passwordHash,
      });
      if (newUser) {
        res.status(200).json({
          code: 0,
          _id: newUser.id,
          name: newUser.fullName,
        });
      } else {
        res.status(400).send({ msg: "Error" });
      }
    } catch (e: any) {
      res.status(500).send({ msg: "Internal Server Error" });
      console.log(e);
    }
  },
  getAllUser: async (_req: Request, res: Response) => {
    try {
      const user = await User.find().select("-password").sort("-createdAt");
      if (!user) return res.status(404).send({ msg: "User not found" });
      res.json({ user });
    } catch (e: any) {
      res.status(500).send({ msg: "Internal Server Error" });
      console.log(e);
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).send({ msg: "User not found" });
      res.json({ user });
    } catch (e: any) {
      res.status(500).send({ msg: "Internal Server Error" });
      console.log(e);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send({ msg: "Account not exist" });
      handleUserLogin(user, password, res);
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: "Invalid" });
    try {
      res.clearCookie("refreshtoken", { path: "/api/rf-token" });
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );
      return res.send("Logout!");
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.body.rf_token;
      if (!rf_token) return res.status(400).send({ msg: "Login!" });

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id) return res.status(400).send({ msg: "Login!" });

      const user = await User.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user) return res.status(400).send({ msg: "Error" });
      if (rf_token !== user.rf_token)
        return res.status(400).send({ msg: "Login!" });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        }
      );

      res.json({ access_token, user });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
};

export default UserController;
