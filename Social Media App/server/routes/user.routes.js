import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
