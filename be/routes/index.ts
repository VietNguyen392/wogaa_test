import express from "express";
import { UserController } from "../controller";
import { validateRegister } from "../utils";
import { authenticate } from "../middleware";

const routes = express.Router();
export const initWebRoute = (app: any) => {
  //*User routes
  routes.get("/user", UserController.getAllUser);
  routes.route("/user/:id").get(UserController.getUserById);
  //*Auth routes
  routes.post("/login", UserController.login);
  routes.get("/logout", authenticate, UserController.logout);
  routes.post("/register", validateRegister, UserController.register);
  routes.get("/rf-token", UserController.refreshToken);
  return app.use("/api", routes);
};
//validRegister,
