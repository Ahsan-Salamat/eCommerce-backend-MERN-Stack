import express, { Router } from "express";
import { registerUser,loginUser , logoutUser , forgetPassword } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);

export default router;