"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
app.use(express_1.default.json({ limit: "40mb" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
exports.io = new socket_io_1.Server(http, {
    cors: { origin: "http://localhost:8000" },
});
const main_1 = require("./config/main");
exports.io.on("connection", (socket) => {
    (0, main_1.SocketServer)(socket);
});
(0, routes_1.initWebRoute)(app);
const URI = "mongodb+srv://AaronNguyen:TinG1YRGKaPQWc4G@final-thesis.hk7sndt.mongodb.net/test";
mongoose_1.default
    .connect(`${URI}`, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
    console.log("connect success to mongodb 🍃");
})
    .catch((err) => {
    throw err;
});
const port = 6030;
http.listen(port, () => {
    console.log("Server is run on port 🚀 ", port);
});
