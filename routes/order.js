import express, { Router } from "express";
import { newOrder ,getOrderDetail } from '../controllers/orderController.js'
const router = express.Router();


import { isAuthenicatedUser } from "../middlewares/auth.js";

router.route('/order/new').post(isAuthenicatedUser,newOrder);
router.route('/order/:_id').get(isAuthenicatedUser,getOrderDetail);

export default router;