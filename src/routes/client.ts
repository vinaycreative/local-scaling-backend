import { authMiddleware } from "@/middleware/authMiddleware";
import authRoutes from "@/modules/client/auth/auth.routes";
import onboardingRoutes from "@/modules/client/onboarding/onboarding.route";
import { Router } from "express";
const router = Router();

router.use("/auth", authRoutes);
router.use("/onboarding", authMiddleware, onboardingRoutes);
export default router;
