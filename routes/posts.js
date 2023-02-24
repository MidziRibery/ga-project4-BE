import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js" //creating these from the controllers.
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //grab user feed when on home page
router.get("/:userId/posts", verifyToken, getUserPosts); // only posts relevant to user

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //like unlike

/* DELETE */

export default router;