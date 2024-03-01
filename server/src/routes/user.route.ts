import express from "express"
import { fetchAuthUser, updateUser } from "../controllers/user.controller"
import { verifyToken } from "../middleware/verify.middleware"

const router = express.Router()

router.get("/", fetchAuthUser)
router.put("/update/:id", verifyToken, updateUser)

export default router
