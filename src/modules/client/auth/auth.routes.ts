import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";
import {
  devLoginController,
  devSignUpController,
  exchangeSessionController,
  getLoggedInUserController,
  loginUserController,
  logoutUserController,
  signUpUserController,
} from "./auth.controller";

const router = Router();

router.post("/login", loginUserController);
router.post("/signup", signUpUserController);
router.post("/exchange-session", exchangeSessionController);
router.get("/dev-signup", devSignUpController);
router.post("/dev-login", devLoginController);
router.get("/me", authMiddleware, getLoggedInUserController);
router.post("/logout", logoutUserController);
export default router;
