import Router from "express";
import {
  authApi,
  getMe,
  initializeGoogleAuth,
  logout,
  refresh,
} from "../controller/UserController.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/userValidator.js";
import { authenticate } from "../middlewear/authMiddlewear.js";

const router = Router();

router.get("/google",initializeGoogleAuth)

router.get("/google/callback", authApi)

router.post("/refresh", refresh);

router.get("/me", authenticate, getMe);

router.post("/logout", authenticate, logout)

export default router;
