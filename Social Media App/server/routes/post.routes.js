import { Router } from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
