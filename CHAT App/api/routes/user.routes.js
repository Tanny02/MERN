import express from "express";
import {
  getPeople,
  login,
  logout,
  profile,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/people", getPeople);
router.get("/profile", profile);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
