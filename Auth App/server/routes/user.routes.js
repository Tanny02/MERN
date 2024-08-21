import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(verifyToken, getUser).put(verifyToken, updateUser);

export default router;
