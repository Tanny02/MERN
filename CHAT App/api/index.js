import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import Message from "./models/message.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";
import fs from "fs";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

dotenv.config();
connectDB();

const app = express();

const __dirname = import.meta.dirname;

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("Hello, world!");
});

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const server = app.listen(4040);

const wss = new WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const notify = () => {
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((client) => ({
            id: client.id,
            username: client.username,
          })),
        })
      );
    });
  };

  connection.isAlive = true;
  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notify();
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });

  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));
    if (tokenString) {
      const token = tokenString.split("=")[1];
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
          if (err) throw err;
          const { id, username } = user;
          connection.id = id;
          connection.username = username;
        });
      }
    }
  }

  connection.on("message", (message) => {
    const messageData = JSON.parse(message.toString());
    const { sender, recipient, text, file } = messageData;
    let filename = null;
    if (file) {
      const parts = file.name.split(".");
      const ext = parts[parts.length - 1];
      filename = Date.now() + "." + ext;
      const path = __dirname + "/uploads/" + filename;
      const bufferData = Buffer.from(file.data.split(",")[1], "base64");
      fs.writeFile(path, bufferData, () => {
        console.log("File saved: " + path);
      });
    }
    if (recipient && (text || file)) {
      const messageDoc = new Message({
        sender,
        recipient,
        text,
        file: file ? filename : null,
      });
      messageDoc.save();
      [...wss.clients]
        .filter((client) => client.id === recipient)
        .forEach((client) =>
          client.send(
            JSON.stringify({
              sender,
              text,
              recipient,
              _id: messageDoc._id,
              file: file ? filename : null,
            })
          )
        );
    }
  });

  notify();
});
