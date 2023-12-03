import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { initWebRoute } from "./routes";
const app = express();
const http = createServer(app);
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
export const io = new Server(http, {
  cors: { origin: "http://localhost:8000" },
});
import { SocketServer } from "./config/main";
io.on("connection", (socket: Socket) => {
  SocketServer(socket);
});
initWebRoute(app);
const URI =
  "mongodb+srv://AaronNguyen:TinG1YRGKaPQWc4G@final-thesis.hk7sndt.mongodb.net/test";
mongoose
  .connect(`${URI!}`, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("connect success to mongodb 🍃");
  })
  .catch((err: string) => {
    throw err;
  });
const port = 6030;
http.listen(port, () => {
  console.log("Server is run on port 🚀 ", port);
});
