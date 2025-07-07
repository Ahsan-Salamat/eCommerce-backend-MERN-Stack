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
  getAllUsers,
  getUser
} from "../controllers/authControllers.js";

const router = express.Router();

import { isAuthenicatedUser,authorizeRoles } from "../middlewares/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenicatedUser, userProfile);
router.route("/profile/update").get(isAuthenicatedUser, updateProfile);
router.route("/password/update").get(isAuthenicatedUser, updatePassword);


router.route("/admin/users").get(isAuthenicatedUser, authorizeRoles('admin') ,getAllUsers);
router.route("/admin/user/:_id").get(isAuthenicatedUser, authorizeRoles('admin') ,getUser);

export default router;
