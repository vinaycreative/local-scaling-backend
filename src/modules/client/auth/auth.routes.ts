import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import {
  exchangeSessionController,
  // getLoggedInUserController,
  // loginUserController,
  // logoutUserController,
  signUpUserController,
} from "./auth.controller";

const router = Router();

// router.post("/login", loginUserController);
router.post("/signup", signUpUserController);
router.post("/exchange-session", exchangeSessionController);
// router.get("/me", authMiddleware, getLoggedInUserController);
// router.post("/logout", logoutUserController);
export default router;
