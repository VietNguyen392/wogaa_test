"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollController = exports.UserController = void 0;
// entry point here
const UserController_1 = __importDefault(require("./UserController"));
exports.UserController = UserController_1.default;
const PollController_1 = __importDefault(require("./PollController"));
exports.PollController = PollController_1.default;
