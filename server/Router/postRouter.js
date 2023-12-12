import express from "express";
import { verifyToken } from '../middleware/auth.js';

import { getFeedPosts,createPost,getUserPost,likePost } from "../controller/posts.js";


const router=express.Router();


router.post("/",verifyToken,createPost)
router.get("/",verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPost);


router.patch("/:id/like",verifyToken,likePost)

export default router;