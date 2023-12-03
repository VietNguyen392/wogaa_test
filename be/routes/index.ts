import express from "express";
import { UserController, PollController } from "../controller";
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
  //*Poll routes
  routes.post("/create-poll", authenticate, PollController.createPoll);
  routes.get("/polls", PollController.getAllPoll);
  routes.get("/poll/:id", PollController.getPollById);
  routes.patch("/voted/:id", authenticate, PollController.updateVote);
  return app.use("/api", routes);
};
//validRegister,
