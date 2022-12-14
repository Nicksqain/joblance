require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import User from "./models/user";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import conversationRoutes from "./routes/conversations";
import messagesRoutes from "./routes/messages";

const morgan = require("morgan");

const app = express();
app.use(cors());
const setSecurityHeaders = (_, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Cross-Origin-Resource-Policy": "same-site",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Expect-CT": "enforce, max-age=86400",
    "Content-Security-Policy": `object-src 'none'; script-src 'self'; img-src 'self'; frame-ancestors 'self'; require-trusted-types-for 'script'; block-all-mixed-content; upgrade-insecure-requests`,
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=()",
  });
  next();
};
// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", process.exit()));

// middlewares
app.disable("x-powered-by");
app.use(setSecurityHeaders);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// route middlewares
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);
// app.use("/api", authRoutes);\
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
const http = require("http").createServer(app);

const io = new Server(http, {
  path: "/socket.io",
  cors: {
    origins: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type"],
    // credentials: false,
  },
});

let users = [];

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  // Добавление айди онлайн юзера
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Добавление сообщения
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    console.log(user);
    if (user !== undefined) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        message,
      });
    } else {
      return;
    }
  });
  socket.on("addAuthUserId", function (data) {
    // Добавление юера в комнату
    console.log("зашёл: ", data.auth.id);
    socket.join(data.auth.id);
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const changeStream = User.watch();

changeStream.on("change", function (change) {
  const idChangedUser = change.documentKey._id.valueOf();
  io.in(idChangedUser).emit("userAccountChange", {
    msg: "Данные вашего аккаунта были изменены!",
  });

  // socket.emit("userAccountChange", change.documentKey._id.valueOf());
  // User.find({}, (err, data) => {
  //   if (err) throw err;

  //   if (data) {

  //   }
  // });
  console.log("document CHANGED:", change);
  console.log("document CHANGED:", change.documentKey._id.valueOf());
});
http.listen(8000, () => console.log("Server running on port 8000"));
