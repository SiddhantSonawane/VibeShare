import express from "express"
import{ getUser, getUserFriends, addRemoveFriend, updateUser, profileViews, impressionCount, searchUsers} from "../controllers/users.js"
import { verifyToken } from "../middleware/authMd.js"

const router = express.Router()

router.get('/search', verifyToken, searchUsers);  
// READ ROUTES
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

// search route


router.patch('/profileviews/:userId', verifyToken, profileViews)
router.patch("/impressions/:userId", verifyToken, impressionCount)

// update route
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)
router.put("/:userId/update", verifyToken, updateUser)

export default router