"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
const routes = express_1.default.Router();
const initWebRoute = (app) => {
    //*User routes
    routes.get("/user", controller_1.UserController.getAllUser);
    routes.route("/user/:id").get(controller_1.UserController.getUserById);
    //*Auth routes
    routes.post("/login", controller_1.UserController.login);
    routes.get("/logout", middleware_1.authenticate, controller_1.UserController.logout);
    routes.post("/register", utils_1.validateRegister, controller_1.UserController.register);
    routes.post("/rf-token", controller_1.UserController.refreshToken);
    //*Poll routes
    routes.post("/create-poll", controller_1.PollController.createPoll);
    routes.get("/polls", controller_1.PollController.getAllPoll);
    routes.get("/poll/:id", controller_1.PollController.getPollById);
    routes.patch("/voted/:id", controller_1.PollController.updateVote);
    return app.use("/api", routes);
};
exports.initWebRoute = initWebRoute;
//validRegister,
