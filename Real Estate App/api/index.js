import express from "express";
import dotenv from "dotenv";
import connectDB from "../connectDB.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
