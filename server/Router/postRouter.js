import express from "express";
import { verifyToken } from '../middleware/auth.js';
import Post from "../model/post.js";
import { pagination } from "../middleware/pagination.js";
import { getFeedPosts,getComment,createPost,addComment,getUserPost,likePost } from "../controller/posts.js";

const router=express.Router();
router.post("/",verifyToken,createPost)
router.get("/",pagination(Post),  verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPost);
router.post("/:postId/comment",verifyToken,addComment);
router.get("/:postId/comment",verifyToken,getComment);
router.patch("/:id/like",verifyToken,likePost)
export default router;
