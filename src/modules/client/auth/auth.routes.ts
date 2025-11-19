import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import {
  getLoggedInUserController,
  loginUserController,
  logoutUserController,
} from "./auth.controller";

const router = Router();

router.post("/login", loginUserController);
router.get("/me", authMiddleware, getLoggedInUserController);
router.post("/logout", logoutUserController);
export default router;
