import express from 'express'
import { verifyToken } from '../middleware/auth.js';
import { getUser,getUserFriends,addRemoveFriends } from '../controller/users.js';

const router=express.Router(); 
 
router.get("/:id",verifyToken,getUser);
router.get("/:id",verifyToken,getUserFriends);
router.patch("/:id/:friendsId",verifyToken,addRemoveFriends);


export default router;




