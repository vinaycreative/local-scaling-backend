import { Router } from "express";
import {
  getBrandingController,
  getBusinessInfoController,
  saveBrandingController,
  saveBusinessInfoController,
  saveWebsiteInfoController,
} from "./onboarding.controller";

const router = Router();

router.get("/business-info", getBusinessInfoController);
router.post("/business-info", saveBusinessInfoController);
router.post("/website", saveWebsiteInfoController);
router.post("/branding", saveBrandingController);
router.get("/branding", getBrandingController);

export default router;
