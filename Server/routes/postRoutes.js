import express from "express"
import { verifyToken } from "../middleware/authMd.js"
import { getFeedPosts, getUserPosts, likePost, addComment, deletePost } from "../controllers/posts.js"

const router = express.Router()

// read routes

router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

// update routes
router.patch("/:id/like", verifyToken, likePost)
router.patch("/:postId/comment", addComment)

// delete route
router.delete('/:postId', deletePost);

export default router