import express from "express"
import { fetchAuthUser } from "../controllers/user.controller"

const router = express.Router()

router.get("/", fetchAuthUser)

export default router
