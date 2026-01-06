import { Router } from "express"
import {
  getLoggedInUserController,
  loginUserController,
  logoutUserController,
  signUpUserController,
} from "./auth.controller"
import { authMiddleware } from "@/middleware/authMiddleware"

const router = Router()

router.post("/login", loginUserController)
router.post("/signup", signUpUserController)
router.get("/me", authMiddleware, getLoggedInUserController)
router.post("/logout", logoutUserController)
export default router
