import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  userProfile,
  updatePassword,
  updateProfile,
} from "../controllers/authControllers.js";

const router = express.Router();

import { isAuthenicatedUser } from "../middlewares/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenicatedUser, userProfile);
router.route("/profile/update").get(isAuthenicatedUser, updateProfile);
router.route("/password/update").get(isAuthenicatedUser, updatePassword);

export default router;
