import express, { Router } from "express";
import { registerUser } from "../controllers/authControllers";

const router = express.Router();

router.route("/register").post(registerUser);

export default router;